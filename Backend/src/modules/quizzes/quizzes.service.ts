import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateQuizDto,
  UpdateQuizDto,
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto,
  ReorderQuestionsDto,
  SubmitQuizDto,
} from '../courses/dto/quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) { }

  // ========== QUIZ CRUD ==========

  async createQuiz(dto: CreateQuizDto) {
    const { questions, ...quizData } = dto;

    const questionCreateInput = questions?.map((q) => ({
      ...q,
      options: q.options ? JSON.stringify(q.options) : null,
      correct_answers: q.correct_answers
        ? JSON.stringify(q.correct_answers)
        : null,
    }));

    return this.prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: questionCreateInput,
        },
      },
      include: {
        questions: {
          orderBy: { order_index: 'asc' },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });
  }

  async updateQuiz(quizId: string, dto: UpdateQuizDto) {
    const { questions, ...quizData } = dto;

    if (questions) {
      // Full update strategy for questions
      return this.prisma.$transaction(async (tx) => {
        // Update basic details
        await tx.quiz.update({
          where: { id: quizId },
          data: quizData,
        });

        // Delete all existing questions 
        // (In a real app, we might want to be smarter to preserve submission history linkage if needed, 
        // but for now, full replacement is safer for consistency with Set logic)
        await tx.quizQuestion.deleteMany({
          where: { quiz_id: quizId },
        });

        // Create new questions
        if (questions.length > 0) {
          await tx.quizQuestion.createMany({
            data: questions.map(q => ({
              quiz_id: quizId,
              ...q,
              options: q.options ? JSON.stringify(q.options) : null,
              correct_answers: q.correct_answers ? JSON.stringify(q.correct_answers) : null,
            }))
          });
        }

        return tx.quiz.findUnique({
          where: { id: quizId },
          include: { questions: { orderBy: { order_index: 'asc' } } }
        });
      });
    }

    return this.prisma.quiz.update({
      where: { id: quizId },
      data: quizData,
      include: {
        questions: {
          orderBy: { order_index: 'asc' },
        },
      },
    });
  }

  async getQuiz(quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order_index: 'asc' },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Parse JSON fields for frontend
    const questions = quiz.questions.map(q => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : [],
      correct_answers: q.correct_answers ? JSON.parse(q.correct_answers) : []
    }));

    return { ...quiz, questions };
  }

  async deleteQuiz(quizId: string) {
    return this.prisma.quiz.delete({ where: { id: quizId } });
  }

  // ========== QUESTION CRUD ==========

  async addQuestion(quizId: string, dto: CreateQuizQuestionDto) {
    return this.prisma.quizQuestion.create({
      data: {
        quiz_id: quizId,
        ...dto,
        options: dto.options ? JSON.stringify(dto.options) : null,
        correct_answers: dto.correct_answers
          ? JSON.stringify(dto.correct_answers)
          : null,
      },
    });
  }

  async updateQuestion(questionId: string, dto: UpdateQuizQuestionDto) {
    const data: any = { ...dto };

    if (dto.options) {
      data.options = JSON.stringify(dto.options);
    }
    if (dto.correct_answers) {
      data.correct_answers = JSON.stringify(dto.correct_answers);
    }

    return this.prisma.quizQuestion.update({
      where: { id: questionId },
      data,
    });
  }

  async deleteQuestion(questionId: string) {
    return this.prisma.quizQuestion.delete({
      where: { id: questionId },
    });
  }

  async reorderQuestions(dto: ReorderQuestionsDto) {
    await this.prisma.$transaction(
      dto.question_orders.map((order) =>
        this.prisma.quizQuestion.update({
          where: { id: order.id },
          data: { order_index: order.order_index },
        }),
      ),
    );

    return { success: true };
  }

  // ========== QUIZ SUBMISSION & GRADING ==========

  async submitQuiz(quizId: string, studentId: string, dto: SubmitQuizDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order_index: 'asc' }
        }
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Check attempts limit
    if (quiz.attempts_allowed > 0) {
      const previousAttempts = await this.prisma.quizSubmission.count({
        where: {
          quiz_id: quizId,
          student_id: studentId,
        },
      });

      if (previousAttempts >= quiz.attempts_allowed) {
        throw new BadRequestException('Maximum attempts reached');
      }
    }

    // Select questions based on logic (if we had Set logic fully implemented here)
    // For now, grading all questions returned.
    // Ensure we parse questions for grading
    const questions = quiz.questions.map(q => ({
      ...q,
      correct_answers: q.correct_answers ? JSON.parse(q.correct_answers) : []
    }));

    // Auto-grade if enabled
    let score: number | null = null;
    let passed = false;

    if (quiz.auto_grade) {
      const gradeResult = this.gradeQuiz(questions, dto.answers);
      score = gradeResult.score;
      passed = score >= quiz.passing_score;
    }

    const submission = await this.prisma.quizSubmission.create({
      data: {
        quiz_id: quizId,
        student_id: studentId,
        answers: JSON.stringify(dto.answers),
        score,
        passed,
        time_taken_minutes: dto.time_taken_minutes,
      },
    });

    return {
      ...submission,
      answers: dto.answers,
    };
  }

  private gradeQuiz(questions: any[], studentAnswers: Record<string, any>) {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((question) => {
      // In a real set-based exam, we should only grade questions that were in the set.
      // Assuming frontend sends answers for all questions in the set.
      if (!studentAnswers.hasOwnProperty(question.id)) {
        // If question was not answered, it counts as 0 points but adds to totalPoints
        // unless it wasn't part of the set. 
        // Implementation detail: we assume questions passed here ARE the questions in the exam.
      }

      totalPoints += question.points;

      const studentAnswer = studentAnswers[question.id];
      const correctAnswers = question.correct_answers || [];

      let isCorrect = false;

      // Skip grading if no answer provided
      if (studentAnswer !== undefined && studentAnswer !== null) {
        switch (question.type) {
          case 'MCQ':
          case 'TRUE_FALSE':
            isCorrect = studentAnswer === correctAnswers[0];
            break;
          case 'MULTIPLE':
            // Check if arrays match
            isCorrect =
              Array.isArray(studentAnswer) &&
              studentAnswer.length === correctAnswers.length &&
              studentAnswer.every((ans: any) => correctAnswers.includes(ans));
            break;
          case 'FILL_BLANK':
            isCorrect = correctAnswers.some(
              (correct: string) =>
                studentAnswer?.toString().toLowerCase().trim() ===
                correct.toString().toLowerCase().trim(),
            );
            break;
          case 'DESCRIPTIVE':
          case 'CODE':
            // These require manual grading
            isCorrect = false;
            break;
        }
      }

      if (isCorrect) {
        earnedPoints += question.points;
      }
    });

    const score =
      totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    return { score, earnedPoints, totalPoints };
  }

  async getSubmissions(quizId: string, studentId?: string) {
    const where: any = { quiz_id: quizId };
    if (studentId) {
      where.student_id = studentId;
    }

    const submissions = await this.prisma.quizSubmission.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { submitted_at: 'desc' },
    });

    return submissions.map((sub) => ({
      ...sub,
      answers: sub.answers ? JSON.parse(sub.answers) : {},
    }));
  }
}
