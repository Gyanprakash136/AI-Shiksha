import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async getMetrics(userId: string) {
        const id = userId;
        const [enrolledCount, completedModules, certificatesCount] = await Promise.all([
            this.prisma.enrollment.count({
                where: { student_id: id },
            }),
            // Use completed enrollments as a proxy for completed modules/courses
            this.prisma.enrollment.count({
                where: { student_id: id, status: 'completed' },
            }),
            // Count actual certificates if table exists, otherwise use completed courses
            this.prisma.certificate.count({
                where: { student_id: id },
            }).catch(() => 0), // Fallback if table issues
        ]);

        return {
            coursesEnrolled: enrolledCount,
            hoursLearned: completedModules * 5, // Rough estimate: 5 hours per course
            certificatesEarned: certificatesCount,
        };
    }

    async getResumeCourse(userId: string) {
        const id = userId;

        // Find the most recently accessed enrollment
        const lastAccessedEnrollment = await this.prisma.enrollment.findFirst({
            where: {
                student_id: id,
                status: 'in_progress', // Only active courses
            },
            orderBy: {
                last_activity_at: 'desc',
            },
            include: {
                course: {
                    include: {
                        course_progress: {
                            where: { student_id: id }
                        }
                    }
                },
            },
        });

        if (!lastAccessedEnrollment) {
            // If no in-progress course, try any enrolled course
            const anyEnrollment = await this.prisma.enrollment.findFirst({
                where: { student_id: id },
                include: { course: true },
            });

            if (!anyEnrollment) return null;

            // Default to start of course
            return {
                courseId: anyEnrollment.course.id,
                courseSlug: anyEnrollment.course.slug,
                courseName: anyEnrollment.course.title,
                lessonId: "intro", // Placeholder, frontend should handle redirect to first lesson if not found
                lessonSlug: "intro",
                lessonTitle: "Start Course",
                progress: anyEnrollment.progress_percentage,
                thumbnail: anyEnrollment.course.thumbnail_url,
            };
        }

        const course = lastAccessedEnrollment.course;
        const progress = (course as any).course_progress?.[0]; // Type assertion to avoid complexity with conditional includes
        const lastItemId = progress?.last_accessed_item_id;

        let lessonId = "intro";
        let lessonTitle = "Continue Learning";
        let lessonSlug = "intro";

        if (lastItemId) {
            // Try to find the item
            const item = await this.prisma.sectionItem.findUnique({
                where: { id: lastItemId },
            });

            if (item) {
                lessonId = item.id;
                lessonTitle = item.title;
                lessonSlug = item.slug || item.id;
            } else {
                // Fallback: try Lesson (legacy)
                const lesson = await this.prisma.lesson.findUnique({
                    where: { id: lastItemId },
                });
                if (lesson) {
                    lessonId = lesson.id;
                    lessonTitle = lesson.title;
                    lessonSlug = lesson.id; // Lesson has no slug, use ID
                }
            }
        } else {
            // No last accessed item, try to find first item of first section
            const firstSection = await this.prisma.courseSection.findFirst({
                where: { course_id: course.id },
                orderBy: { order_index: 'asc' },
                include: {
                    items: {
                        orderBy: { order_index: 'asc' },
                        take: 1
                    }
                }
            });

            if (firstSection && firstSection.items.length > 0) {
                const firstItem = firstSection.items[0];
                lessonId = firstItem.id;
                lessonTitle = firstItem.title;
                lessonSlug = firstItem.slug || firstItem.id;
            } else {
                // Fallback: Check for Legacy Modules/Lessons
                const firstModule = await this.prisma.module.findFirst({
                    where: { course_id: course.id },
                    orderBy: { position: 'asc' },
                    include: {
                        lessons: {
                            orderBy: { position: 'asc' },
                            take: 1
                        }
                    }
                });

                if (firstModule && firstModule.lessons.length > 0) {
                    const firstLesson = firstModule.lessons[0];
                    lessonId = firstLesson.id;
                    lessonTitle = firstLesson.title;
                    lessonSlug = firstLesson.id; // Lessons don't have slugs usually, use ID
                }
            }
        }

        return {
            courseId: course.id,
            courseSlug: course.slug,
            courseName: course.title,
            lessonId: lessonId,
            lessonSlug: lessonSlug,
            lessonTitle: lessonTitle,
            progress: lastAccessedEnrollment.progress_percentage,
            thumbnail: course.thumbnail_url,
        };
    }

    async getMilestones(userId: string) {
        const id = userId;

        const [total, completed, next, allMilestones] = await Promise.all([
            this.prisma.milestone.count({ where: { student_id: id } }),
            this.prisma.milestone.count({ where: { student_id: id, completed: true } }),
            this.prisma.milestone.findFirst({
                where: { student_id: id, completed: false },
                orderBy: { created_at: 'asc' },
            }),
            this.prisma.milestone.findMany({
                where: { student_id: id },
                orderBy: { created_at: 'asc' },
            }),
        ]);

        return {
            nextMilestone: next?.title || "Set a new milestone!",
            progress: completed,
            total: total || 1, // Avoid division by zero
            reward: "Personal Achievement",
            milestones: allMilestones,
        };
    }

    async addMilestone(userId: string, dto: any) {
        return this.prisma.milestone.create({
            data: {
                student_id: userId,
                title: dto.title,
                target_date: dto.targetDate ? new Date(dto.targetDate) : undefined,
            },
        });
    }

    async completeMilestone(userId: string, milestoneId: string) {
        // Verify ownership
        const milestone = await this.prisma.milestone.findUnique({
            where: { id: milestoneId },
        });

        if (!milestone || milestone.student_id !== userId) {
            throw new Error('Milestone not found or unauthorized');
        }

        return this.prisma.milestone.update({
            where: { id: milestoneId },
            data: { completed: true },
        });
    }

    async getWeeklyGoal(userId: string) {
        const id = userId;
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { weekly_goal_hours: true, weekly_minutes_spent: true },
        });

        // Calculate progress based on completed lessons in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const completedLessons = await this.prisma.lessonProgress.count({
            where: {
                student_id: id,
                completed: true,
                updated_at: {
                    gte: sevenDaysAgo,
                },
            },
        });

        // Use actual time spent from User model
        const completedMinutes = user?.weekly_minutes_spent || 0;
        const completedHours = parseFloat((completedMinutes / 60).toFixed(1));
        const targetHours = user?.weekly_goal_hours || 10; // Default to 10 if not set

        return {
            targetHours,
            completedHours,
            progress: Math.min(100, Math.round((completedHours / targetHours) * 100)),
        };
    }

    async updateWeeklyGoal(userId: string, dto: any) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { weekly_goal_hours: dto.targetHours },
        });
    }

    async getMeetings(userId: string) {
        // TODO: Query scheduled meetings if applicable (Admin controlled)
        return [
            {
                id: 1,
                title: "1:1 with Instructor",
                date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                instructor: "Dr. Sarah Johnson",
            },
            {
                id: 2,
                title: "Study Group - React Advanced",
                date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                instructor: "Study Group",
            },
        ];
    }
}
