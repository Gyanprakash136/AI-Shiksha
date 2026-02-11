import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') || '',
      {
        apiVersion: '2024-12-18.acacia' as any, // Use latest or let types decide
      },
    );
  }

  async createCheckoutSession(userId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: { include: { user: true } } },
    });

    if (!course) throw new BadRequestException('Course not found');

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              images: course.thumbnail_url ? [course.thumbnail_url] : [],
            },
            unit_amount: Math.round(course.price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/courses/${courseId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/courses/${courseId}`,
      client_reference_id: userId,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });

    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.fulfillOrder(session);
    }
  }

  private async fulfillOrder(session: Stripe.Checkout.Session) {
    if (
      !session.metadata ||
      !session.metadata.userId ||
      !session.metadata.courseId
    ) {
      console.error('Missing metadata in session', session.id);
      return;
    }
    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    // Check if already enrolled
    const existing = await this.prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: userId,
          course_id: courseId,
        },
      },
    });

    if (existing) return;

    // Create Payment Record
    await this.prisma.payment.create({
      data: {
        user_id: userId,
        course_id: courseId,
        amount: (session.amount_total || 0) / 100,
        payment_provider: 'stripe',
        payment_status: 'completed',
        transaction_id: session.id,
      },
    });

    // Enroll User
    await this.prisma.enrollment.create({
      data: {
        student_id: userId,
        course_id: courseId,
        payment_id: session.id,
        status: 'active',
      },
    });
  }
}
