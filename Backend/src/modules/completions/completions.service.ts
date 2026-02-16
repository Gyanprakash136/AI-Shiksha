import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompletionsService {
    constructor(private prisma: PrismaService) { }

    // Get all course completions with student and course info
    async findAll(search?: string) {
        const where: any = {
            completed: true,
        };

        // Add search filter if provided
        if (search) {
            where.OR = [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { course: { title: { contains: search, mode: 'insensitive' } } },
            ];
        }

        const completions = await this.prisma.courseProgress.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar_url: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                        certificate_enabled: true,
                        certificate_title: true,
                    },
                },
            },
            orderBy: {
                updated_at: 'desc',
            },
        });

        // Enrich with certificate data
        const enriched = await Promise.all(
            completions.map(async (completion) => {
                const certificate = await this.prisma.certificate.findFirst({
                    where: {
                        student_id: completion.student_id,
                        course_id: completion.course_id,
                    },
                });

                return {
                    id: completion.id,
                    student: completion.user,
                    course: completion.course,
                    completed_at: completion.updated_at,
                    progress_percentage: completion.progress_percentage,
                    certificate_issued: !!certificate,
                    certificate_id: certificate?.id,
                    certificate_url: certificate?.certificate_url,
                };
            }),
        );

        return enriched;
    }

    // Get completion statistics
    async getStats() {
        const totalCompletions = await this.prisma.courseProgress.count({
            where: { completed: true },
        });

        const certificatesIssued = await this.prisma.certificate.count();

        // Calculate average score (placeholder - would need quiz/assessment system)
        const avgScore = 86;

        // Completions this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const thisMonth = await this.prisma.courseProgress.count({
            where: {
                completed: true,
                updated_at: {
                    gte: startOfMonth,
                },
            },
        });

        return {
            total_completions: totalCompletions,
            certificates_issued: certificatesIssued,
            avg_score: avgScore,
            this_month: thisMonth,
        };
    }

    // Manually mark course as complete and auto-issue certificate
    async markComplete(studentId: string, courseId: string, adminUserId: string) {
        // Verify student exists
        const student = await this.prisma.user.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Verify course exists
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        // Check if student is enrolled
        const enrollment = await this.prisma.enrollment.findFirst({
            where: {
                student_id: studentId,
                course_id: courseId,
            },
        });

        if (!enrollment) {
            throw new BadRequestException('Student is not enrolled in this course');
        }

        // Update or create course progress
        const progress = await this.prisma.courseProgress.upsert({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
            update: {
                completed: true,
                progress_percentage: 100,
                updated_at: new Date(),
            },
            create: {
                student_id: studentId,
                course_id: courseId,
                completed: true,
                progress_percentage: 100,
            },
            include: {
                user: true,
                course: true,
            },
        });

        // Auto-issue certificate if enabled

        let certificate: any = null;
        if (course.certificate_enabled) {
            // Check if certificate already exists
            const existingCert = await this.prisma.certificate.findFirst({
                where: {
                    student_id: studentId,
                    course_id: courseId,
                },
            });

            if (!existingCert) {
                certificate = await this.prisma.certificate.create({
                    data: {
                        student_id: studentId,
                        course_id: courseId,
                        issued_at: new Date(),
                        certificate_url: `/api/certificates/${studentId}/${courseId}.pdf`,
                    },
                });
            } else {
                certificate = existingCert;
            }
        }

        return {
            progress,
            certificate,
            message: certificate
                ? 'Course marked as complete and certificate issued'
                : 'Course marked as complete',
        };
    }

    // Issue certificate for a completed course
    async issueCertificate(studentId: string, courseId: string) {
        // Verify completion
        const progress = await this.prisma.courseProgress.findFirst({
            where: {
                student_id: studentId,
                course_id: courseId,
                completed: true,
            },
            include: {
                user: true,
                course: true,
            },
        });

        if (!progress) {
            throw new BadRequestException('Course not completed by this student');
        }

        if (!progress.course.certificate_enabled) {
            throw new BadRequestException('Certificates are not enabled for this course');
        }

        // Check if certificate already exists
        const existing = await this.prisma.certificate.findFirst({
            where: {
                student_id: studentId,
                course_id: courseId,
            },
        });

        if (existing) {
            return {
                certificate: existing,
                message: 'Certificate already issued',
            };
        }

        // Create certificate
        const certificate = await this.prisma.certificate.create({
            data: {
                student_id: studentId,
                course_id: courseId,
                issued_at: new Date(),
                certificate_url: `/api/certificates/${studentId}/${courseId}.pdf`,
            },
        });

        return {
            certificate,
            message: 'Certificate issued successfully',
        };
    }

    async markLessonComplete(studentId: string, lessonId: string) {
        // Find lesson and related course
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: { module: { include: { course: true } } },
        });

        if (!lesson) {
            // Try to find as SectionItem if not found as Lesson
            return this.markSectionItemComplete(studentId, lessonId);
        }

        const courseId = lesson.module.course.id;

        // Verify enrollment
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
        });

        if (!enrollment || enrollment.status !== 'active') {
            throw new BadRequestException('Student is not enrolled in this course');
        }

        // Update lesson progress
        const progress = await this.prisma.lessonProgress.upsert({
            where: {
                student_id_lesson_id: {
                    student_id: studentId,
                    lesson_id: lessonId,
                },
            },
            update: {
                completed: true,
                completed_at: new Date(),
            },
            create: {
                student_id: studentId,
                lesson_id: lessonId,
                completed: true,
                completed_at: new Date(),
            },
        });

        // Recalculate course progress
        await this.updateCourseProgress(studentId, courseId);

        return progress;
    }

    async markSectionItemComplete(studentId: string, itemId: string) {
        // Find item and related course
        const item = await this.prisma.sectionItem.findUnique({
            where: { id: itemId },
            include: { section: { include: { course: true } } },
        });

        if (!item) {
            throw new NotFoundException('Lesson not found');
        }

        const courseId = item.section.course.id;

        // Verify enrollment
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
        });

        if (!enrollment || enrollment.status !== 'active') {
            throw new BadRequestException('Student is not enrolled in this course');
        }

        // Update section item progress
        const progress = await this.prisma.sectionItemProgress.upsert({
            where: {
                student_id_item_id: {
                    student_id: studentId,
                    item_id: itemId,
                },
            },
            update: {
                completed: true,
                completed_at: new Date(),
            },
            create: {
                student_id: studentId,
                item_id: itemId,
                completed: true,
                completed_at: new Date(),
            },
        });

        // Recalculate course progress
        await this.updateCourseProgress(studentId, courseId);

        return progress;
    }

    private async updateCourseProgress(studentId: string, courseId: string) {
        // Get total lessons (Legacy)
        const totalLessons = await this.prisma.lesson.count({
            where: {
                module: {
                    course_id: courseId,
                },
            },
        });

        // Get total section items (New)
        const totalSectionItems = await this.prisma.sectionItem.count({
            where: {
                section: {
                    course_id: courseId,
                },
            },
        });

        const totalItems = totalLessons + totalSectionItems;

        if (totalItems === 0) return;

        // Get completed lessons (Legacy)
        const completedLessons = await this.prisma.lessonProgress.count({
            where: {
                student_id: studentId,
                completed: true,
                lesson: {
                    module: {
                        course_id: courseId,
                    },
                },
            },
        });

        // Get completed section items (New)
        const completedSectionItems = await this.prisma.sectionItemProgress.count({
            where: {
                student_id: studentId,
                completed: true,
                item: {
                    section: {
                        course_id: courseId,
                    },
                },
            },
        });

        const completedItems = completedLessons + completedSectionItems;

        const percentage = (completedItems / totalItems) * 100;
        const isComplete = percentage === 100;

        // Update Course Progress
        await this.prisma.courseProgress.upsert({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
            update: {
                progress_percentage: percentage,
                completed: isComplete,
                updated_at: new Date(),
            },
            create: {
                student_id: studentId,
                course_id: courseId,
                progress_percentage: percentage,
                completed: isComplete,
            },
        });

        // Update Enrollment progress
        await this.prisma.enrollment.update({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
            data: {
                progress_percentage: Math.round(percentage),
                completed_at: isComplete ? new Date() : null,
                last_activity_at: new Date(),
            },
        });

    }

    async logAccess(studentId: string, courseId: string, itemId: string) {
        // Verify enrollment
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
        });

        if (!enrollment || enrollment.status !== 'active') {
            throw new BadRequestException('Student is not enrolled in this course');
        }

        // Update Course Progress
        await this.prisma.courseProgress.upsert({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
            update: {
                last_accessed_at: new Date(),
                last_accessed_item_id: itemId,
            },
            create: {
                student_id: studentId,
                course_id: courseId,
                last_accessed_at: new Date(),
                last_accessed_item_id: itemId,
            },
        });

        // Update Enrollment
        await this.prisma.enrollment.update({
            where: {
                student_id_course_id: {
                    student_id: studentId,
                    course_id: courseId,
                },
            },
            data: {
                last_activity_at: new Date(),
            },
        });

        return { success: true };
    }

    async updateTimeSpent(studentId: string, durationMinutes: number) {
        if (durationMinutes <= 0) return;

        // Update User's weekly minutes
        await this.prisma.user.update({
            where: { id: studentId },
            data: {
                weekly_minutes_spent: {
                    increment: durationMinutes,
                },
            },
        });

        return { success: true };
    }
}
