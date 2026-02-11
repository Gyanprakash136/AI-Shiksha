import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto) {
    const { courseId, ...rest } = createModuleDto;
    // Verify course exists?
    return this.prisma.module.create({
      data: {
        ...rest,
        course_id: courseId,
      },
    });
  }

  async findAll(courseId: string) {
    return this.prisma.module.findMany({
      where: { course_id: courseId },
      orderBy: { position: 'asc' },
      include: { lessons: true },
    });
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: { lessons: true },
    });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const { courseId, ...rest } = updateModuleDto;
    return this.prisma.module.update({
      where: { id },
      data: rest,
    });
  }

  async remove(id: string) {
    return this.prisma.module.delete({
      where: { id },
    });
  }
}
