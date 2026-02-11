import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async indexLesson(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson || !lesson.content) return;

    // Simple chunking for now. Assume content is string or JSON.
    // If JSON, stringify it.
    const text = JSON.stringify(lesson.content);

    // Create chunks (simplified)
    const chunks = text.match(/.{1,1000}/g) || [];

    // Delete existing embeddings
    await this.prisma.lessonEmbedding.deleteMany({
      where: { lesson_id: lessonId },
    });

    for (const chunk of chunks) {
      const embedding = await this.getEmbedding(chunk);
      const vectorString = `[${embedding.join(',')}]`;

      // Store using raw query for vector type
      await this.prisma.$executeRaw`
        INSERT INTO "lesson_embeddings" (id, lesson_id, content_chunk, embedding, created_at)
        VALUES (gen_random_uuid(), ${lessonId}, ${chunk}, ${vectorString}::vector, NOW())
      `;
    }
  }

  async chat(userId: string, chatDto: ChatDto) {
    const { message, courseId, lessonId } = chatDto;

    // 1. Get embedding for query
    const queryEmbedding = await this.getEmbedding(message);
    const vectorString = `[${queryEmbedding.join(',')}]`;

    // 2. Search similar context
    // We can filter by courseId or lessonId if provided using WHERE clause in SQL
    let context = '';

    if (lessonId) {
      const results = await this.prisma.$queryRaw`
         SELECT content_chunk
         FROM "lesson_embeddings"
         WHERE lesson_id = ${lessonId}
         ORDER BY embedding <-> ${vectorString}::vector
         LIMIT 3
       `;
      context = results.map((r: any) => r.content_chunk).join('\n');
    } else if (courseId) {
      // Join with lessons to filter by course
      // Complex query, simplified for now: exact relation
      const results = await this.prisma.$queryRaw`
         SELECT le.content_chunk, le.embedding
         FROM "lesson_embeddings" le
         JOIN "lessons" l ON le.lesson_id = l.id
         JOIN "modules" m ON l.module_id = m.id
         WHERE m.course_id = ${courseId}
         ORDER BY le.embedding <-> ${vectorString}::vector
         LIMIT 3
       `;
      context = results.map((r: any) => r.content_chunk).join('\n');
    }

    // 3. Create Conversation Entry
    const conversation = await this.prisma.aIConversation.create({
      data: {
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
      },
    });

    // 4. Send to LLM
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI tutor. Use the following context to answer the student's question:\n\n${context}`,
        },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    });

    const response =
      completion.choices[0].message.content ||
      'Sorry, I could not generate a response.';

    // 5. Save Messages
    await this.prisma.aIMessage.createMany({
      data: [
        { conversation_id: conversation.id, role: 'user', content: message },
        {
          conversation_id: conversation.id,
          role: 'assistant',
          content: response,
        },
      ],
    });

    return { response, conversationId: conversation.id };
  }

  private async getEmbedding(text: string) {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text.replace(/\n/g, ' '),
    });
    return response.data[0].embedding;
  }
}
