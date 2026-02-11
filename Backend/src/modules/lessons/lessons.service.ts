import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const { moduleId, ...rest } = createLessonDto;
    return this.prisma.lesson.create({
      data: {
        ...rest,
        module_id: moduleId,
      },
    });
  }

  async findAll(moduleId: string) {
    return this.prisma.lesson.findMany({
      where: { module_id: moduleId },
      orderBy: { position: 'asc' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const { moduleId, ...rest } = updateLessonDto;
    return this.prisma.lesson.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
