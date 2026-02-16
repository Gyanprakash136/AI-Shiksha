import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateSectionDto,
  UpdateSectionDto,
  ReorderSectionsDto,
} from '../courses/dto/section.dto';
import {
  CreateSectionItemDto,
  UpdateSectionItemDto,
  ReorderItemsDto,
  CreateLectureContentDto,
  UpdateLectureContentDto,
} from '../courses/dto/section-item.dto';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) { }

  // ========== SLUG UTILITIES ==========

  /**
   * Generate a URL-friendly slug from a title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Ensure slug uniqueness within a section by appending numbers if needed
   */
  private async ensureUniqueSlug(
    sectionId: string,
    baseSlug: string,
    excludeId?: string,
  ): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.prisma.sectionItem.findFirst({
        where: {
          section_id: sectionId,
          slug,
          id: excludeId ? { not: excludeId } : undefined,
        },
      });

      if (!existing) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  /**
   * Find a section item by course slug and lesson slug
   */
  async findItemBySlug(courseSlug: string, lessonSlug: string, userId?: string) {
    const progressInclude = userId
      ? {
        where: { student_id: userId },
        select: { completed: true, completed_at: true },
      }
      : false;

    const item = await this.prisma.sectionItem.findFirst({
      where: {
        slug: lessonSlug,
        section: {
          course: {
            slug: courseSlug,
          },
        },
      },
      include: {
        section: {
          include: {
            course: {
              include: {
                // Include enrollment for progress percentage
                enrollments: userId ? { where: { student_id: userId } } : false,
                // Include ALL sections and items for the course
                sections: {
                  include: {
                    items: {
                      orderBy: { order_index: 'asc' },
                      include: {
                        sectionItemProgresses: progressInclude,
                      },
                    },
                  },
                  orderBy: { order_index: 'asc' },
                },
              },
            },
          },
        },
        lecture_content: true,
        quiz: {
          include: {
            questions: {
              orderBy: { order_index: 'asc' },
            },
          },
        },
        assignment: true,
        sectionItemProgresses: progressInclude,
      },
    });

    if (!item) {
      throw new NotFoundException(
        `Lesson not found: ${courseSlug}/${lessonSlug}`,
      );
    }

    return item;
  }

  // ========== SECTION CRUD ==========

  async createSection(courseId: string, dto: CreateSectionDto) {
    return this.prisma.courseSection.create({
      data: {
        course_id: courseId,
        ...dto,
      },
      include: {
        items: {
          orderBy: { order_index: 'asc' },
        },
      },
    });
  }

  async updateSection(sectionId: string, dto: UpdateSectionDto) {
    return this.prisma.courseSection.update({
      where: { id: sectionId },
      data: dto,
      include: {
        items: {
          orderBy: { order_index: 'asc' },
        },
      },
    });
  }

  async deleteSection(sectionId: string) {
    // Cascade delete will handle items
    return this.prisma.courseSection.delete({
      where: { id: sectionId },
    });
  }

  async reorderSections(courseId: string, dto: ReorderSectionsDto) {
    // Update multiple sections with new order
    await this.prisma.$transaction(
      dto.section_orders.map((order) =>
        this.prisma.courseSection.update({
          where: { id: order.id },
          data: { order_index: order.order_index },
        }),
      ),
    );

    return { success: true };
  }

  async getSectionsByCourse(courseId: string) {
    return this.prisma.courseSection.findMany({
      where: { course_id: courseId },
      orderBy: { order_index: 'asc' },
      include: {
        items: {
          orderBy: { order_index: 'asc' },
          include: {
            lecture_content: true,
            quiz: {
              include: {
                questions: {
                  orderBy: { order_index: 'asc' },
                },
              },
            },
            assignment: true,
          },
        },
      },
    });
  }

  // ========== SECTION ITEM CRUD ==========

  async createItem(sectionId: string, dto: CreateSectionItemDto) {
    // Auto-generate slug from title if not provided
    let slug = dto.slug;
    if (!slug && dto.title) {
      const baseSlug = this.generateSlug(dto.title);
      slug = await this.ensureUniqueSlug(sectionId, baseSlug);
    }

    return this.prisma.sectionItem.create({
      data: {
        section_id: sectionId,
        ...dto,
        slug,
      },
      include: {
        lecture_content: true,
        quiz: true,
        assignment: true,
      },
    });
  }

  async updateItem(itemId: string, dto: UpdateSectionItemDto) {
    // Regenerate slug if title changed
    let slug = dto.slug;
    if (!slug && dto.title) {
      const item = await this.prisma.sectionItem.findUnique({
        where: { id: itemId },
      });
      if (item) {
        const baseSlug = this.generateSlug(dto.title);
        slug = await this.ensureUniqueSlug(item.section_id, baseSlug, itemId);
      }
    }

    return this.prisma.sectionItem.update({
      where: { id: itemId },
      data: {
        ...dto,
        slug: slug || dto.slug,
      },
      include: {
        lecture_content: true,
        quiz: true,
        assignment: true,
      },
    });
  }

  async deleteItem(itemId: string) {
    return this.prisma.sectionItem.delete({
      where: { id: itemId },
    });
  }

  async reorderItems(dto: ReorderItemsDto) {
    await this.prisma.$transaction(
      dto.item_orders.map((order) =>
        this.prisma.sectionItem.update({
          where: { id: order.id },
          data: { order_index: order.order_index },
        }),
      ),
    );

    return { success: true };
  }

  // ========== LECTURE CONTENT CRUD ==========

  async createLectureContent(itemId: string, dto: CreateLectureContentDto) {
    // Verify item is a lecture
    const item = await this.prisma.sectionItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.type !== 'LECTURE') {
      throw new NotFoundException('Lecture item not found');
    }

    return this.prisma.lectureContent.create({
      data: {
        item_id: itemId,
        ...dto,
        // Convert JSON if needed
        text_content: dto.text_content
          ? JSON.stringify(dto.text_content)
          : null,
      },
    });
  }

  async updateLectureContent(itemId: string, dto: UpdateLectureContentDto) {
    return this.prisma.lectureContent.update({
      where: { item_id: itemId },
      data: {
        ...dto,
        text_content: dto.text_content
          ? JSON.stringify(dto.text_content)
          : undefined,
      },
    });
  }

  async getLectureContent(itemId: string) {
    const content = await this.prisma.lectureContent.findUnique({
      where: { item_id: itemId },
    });

    if (!content) {
      throw new NotFoundException('Lecture content not found');
    }

    // Parse JSON if text_content exists
    if (content.text_content) {
      try {
        (content as any).text_content = JSON.parse(content.text_content);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }

    return content;
  }
}
