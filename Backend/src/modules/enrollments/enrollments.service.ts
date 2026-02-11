import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findOne(studentId: string, courseId: string) {
    return this.prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: studentId,
          course_id: courseId,
        },
      },
    });
  }

  async findMyEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { student_id: studentId },
      include: {
        course: {
          include: { instructor: { include: { user: true } } },
        },
      },
    });
  }

  async checkEnrollment(studentId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.findOne(studentId, courseId);
    return !!enrollment && enrollment.status === 'active';
  }
}
