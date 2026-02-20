import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ServiceUnavailableException } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { AssistantService } from '../src/modules/ai/assistant/assistant.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { GeminiService } from '../src/modules/ai/shared/gemini.service';

describe('AI Module Integration (e2e)', () => {
  let app: INestApplication;
  let assistantService: AssistantService;
  let prisma: PrismaService;
  let geminiService: GeminiService;

  let userId: string;
  let courseAId: string;
  let courseBId: string;

  // Emulation of real embeddings takes time, increase timeout appropriately
  jest.setTimeout(40000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    assistantService = moduleFixture.get<AssistantService>(AssistantService);
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    geminiService = moduleFixture.get<GeminiService>(GeminiService);

    const ts = Date.now();
    const franchise = await prisma.franchise.create({ data: { name: 'E2E ' + ts, domain: `e2e-${ts}.com` } });
    const user = await prisma.user.create({ data: { name: 'E2E Student', email: `e2e-${ts}@test.com`, password_hash: 'hash' }});
    userId = user.id;

    const instructor = await prisma.instructorProfile.create({ data: { user_id: user.id } });

    // COURSE A: ISO
    const courseA = await prisma.course.create({ data: { title: 'Course A', slug: `c-a-${ts}`, instructor_id: instructor.id, franchise_id: franchise.id }});
    courseAId = courseA.id;
    const modA = await prisma.module.create({ data: { title: 'Mod A', position: 1, course_id: courseA.id }});
    await prisma.lesson.create({ data: { title: 'Lesson A', module_id: modA.id, position: 1, content: 'ISO is International Organization for Standardization.' }});
    await prisma.enrollment.create({ data: { student_id: user.id, course_id: courseA.id, status: 'active' }});

    // COURSE B: IOSH
    const courseB = await prisma.course.create({ data: { title: 'Course B', slug: `c-b-${ts}`, instructor_id: instructor.id, franchise_id: franchise.id }});
    courseBId = courseB.id;
    const modB = await prisma.module.create({ data: { title: 'Mod B', position: 1, course_id: courseB.id }});
    await prisma.lesson.create({ data: { title: 'Lesson B', module_id: modB.id, position: 1, content: 'IOSH is Institution of Occupational Safety and Health.' }});
    await prisma.enrollment.create({ data: { student_id: user.id, course_id: courseB.id, status: 'active' }});

    // Wait for the async embedding background task to complete natively via pgvector
    await new Promise(r => setTimeout(r, 4500));
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. Academic Freedom: Course A allows general academic knowledge not in context', async () => {
    const result = await assistantService.chat(userId, {
      courseId: courseAId,
      message: 'What makes IOSH important?'
    });
    
    // Should provide a helpful answer about IOSH, not a refusal
    expect(result.data.response).not.toBe('I am an academic assistant and can only answer questions related to your studies or professional development.');
  });

  it('1.5. Strict Non-Academic Refusal: Blocks non-academic queries', async () => {
    const result = await assistantService.chat(userId, {
      courseId: courseAId,
      message: 'Who won the World Cup in 2022?'
    });
    
    expect(result.data.response).toBe('I am an academic assistant and can only answer questions related to your studies or professional development.');
  });

  it('2. Grounded RAG: Course B successfully retrieves and returns IOSH data', async () => {
    const result = await assistantService.chat(userId, {
      courseId: courseBId,
      message: 'What is IOSH?'
    });
    
    expect(result.data.response).toContain('Institution of Occupational Safety and Health');
  });

  it('3. Resiliency Constraint: External model crashes map cleanly to 503 instead of raw 500s', async () => {
    jest.spyOn(geminiService, 'generateText').mockRejectedValueOnce(new Error('Socket hung up unexpectedly from Google API'));
    
    await expect(assistantService.chat(userId, {
      courseId: courseAId,
      message: 'What is ISO?'
    })).rejects.toThrow(ServiceUnavailableException);
    
    // Restore spy
    jest.restoreAllMocks();
  });
});
