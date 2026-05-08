import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmbeddingService } from './embedding.service';
import { chunkText } from './chunking.util';

@Injectable()
export class RetrievalService {
  private readonly logger = new Logger(RetrievalService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  /**
   * Retrieves the most relevant content chunks for a given query within a course.
   * If a section item is provided, it adds the lecture/video content as priority context.
   */
  async retrieveRelevantChunks(
    courseId: string,
    query: string,
    sectionItemId?: string,
  ): Promise<string[]> {
    if (!query || !query.trim()) return [];

    const chunks: string[] = [];

    if (sectionItemId) {
      const item = await this.prisma.sectionItem.findUnique({
        where: { id: sectionItemId },
        include: {
          lecture_content: true,
          section: {
            select: {
              course_id: true,
            },
          },
        },
      });

      if (item && item.section.course_id === courseId) {
        if (item.type === 'LECTURE' && item.lecture_content) {
          const lectureContext = this.buildLectureContext(item);
          const itemChunks = chunkText(lectureContext, 1200, 400);

          if (itemChunks.length > 0) {
            chunks.push(
              `PRIORITY VIDEO LECTURE CONTEXT for item "${item.title}":`,
              ...itemChunks,
            );
          }
        } else {
          this.logger.debug(
            `Section item ${sectionItemId} is not a lecture or has no lecture content; falling back to course-level retrieval.`,
          );
        }
      } else {
        this.logger.warn(`Section item ${sectionItemId} did not belong to course ${courseId}.`);
      }
    }

    const courseChunks = await this.retrieveCourseEmbeddings(courseId, query);
    chunks.push(...courseChunks);

    return chunks.slice(0, 10);
  }

  private buildLectureContext(item: any): string {
    const contentPieces: string[] = [];

    if (item.title) {
      contentPieces.push(`Title: ${item.title}`);
    }

    if (item.description) {
      contentPieces.push(`Description: ${item.description}`);
    }

    const lecture = item.lecture_content;
    if (lecture) {
      if (lecture.video_url) {
        contentPieces.push(`Video URL: ${lecture.video_url}`);
      }
      if (lecture.video_provider) {
        contentPieces.push(`Video provider: ${lecture.video_provider}`);
      }
      if (lecture.transcript) {
        contentPieces.push(`Transcript:\n${lecture.transcript}`);
      }
      if (lecture.text_content) {
        contentPieces.push(`Text Content:\n${lecture.text_content}`);
      }
      if (lecture.external_link) {
        contentPieces.push(`External link: ${lecture.external_link}`);
      }
    }

    return contentPieces.join('\n\n');
  }

  private async retrieveCourseEmbeddings(courseId: string, query: string): Promise<string[]> {
    // 1. Generate Embedding for the query
    const embedding = await this.embeddingService.generateEmbedding(query);
    
    // If embedding API fails, return empty array (fallback to no context)
    if (!embedding) {
      this.logger.warn('Skipping retrieval: Failed to generate query embedding');
      return [];
    }

    // 2. Format as string for pgvector: '[0.1,0.2,...]'
    const vectorString = `[${embedding.join(',')}]`;

    try {
      const results = await this.prisma.$queryRaw<Array<{ content_chunk: string }>>`
        SELECT content_chunk
        FROM "lesson_embeddings"
        WHERE lesson_id IN (
            SELECT l.id 
            FROM "lessons" l
            INNER JOIN "modules" m ON l.module_id = m.id
            WHERE m.course_id = ${courseId}
        )
        ORDER BY embedding <=> ${vectorString}::vector
        LIMIT 5;
      `;

      return results.map((r) => r.content_chunk);
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Vector Retrieval Failed: ${err.message}`);
      return [];
    }
  }
}
