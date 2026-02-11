import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(instructorUserId: string, createCourseDto: CreateCourseDto) {
    const instructor = await this.prisma.instructorProfile.findUnique({
      where: { user_id: instructorUserId },
    });

    if (!instructor) {
      throw new BadRequestException('User is not an instructor');
    }

    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        instructor_id: instructor.id,
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      where: { published: true },
      include: { instructor: { include: { user: true } } },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: { include: { user: true } },
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { instructor: true },
    });

    if (!course) throw new NotFoundException('Course not found');

    // Verify ownership
    if (course.instructor.user_id !== userId) {
      throw new BadRequestException('You do not own this course'); // Or ForbiddenException
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { instructor: true },
    });

    if (!course) throw new NotFoundException('Course not found');

    // Verify ownership
    if (course.instructor.user_id !== userId) {
      throw new BadRequestException('You do not own this course');
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
