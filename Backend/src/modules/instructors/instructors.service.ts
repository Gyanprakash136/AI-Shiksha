import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { UserRole } from '../users/dto/create-user.dto';

@Injectable()
export class InstructorsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createInstructorDto: CreateInstructorDto) {
    // Check if user exists and upgrade role if needed?
    // Or assume user must apply?
    // Let's just create the profile.

    // Check if profile exists
    const existing = await this.prisma.instructorProfile.findUnique({
      where: { user_id: userId },
    });
    if (existing) {
      throw new BadRequestException('Instructor profile already exists');
    }

    // Update user role to INSTRUCTOR if not already?
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.INSTRUCTOR },
    });

    return this.prisma.instructorProfile.create({
      data: {
        user_id: userId,
        ...createInstructorDto,
      },
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.instructorProfile.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const instructor = await this.prisma.instructorProfile.findUnique({
      where: { id },
      include: { user: true, courses: true },
    });
    if (!instructor) throw new NotFoundException('Instructor not found');
    return instructor;
  }

  async findByUserId(userId: string) {
    return this.prisma.instructorProfile.findUnique({
      where: { user_id: userId },
      include: { user: true, courses: true },
    });
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    return this.prisma.instructorProfile.update({
      where: { id },
      data: updateInstructorDto,
    });
  }
}
