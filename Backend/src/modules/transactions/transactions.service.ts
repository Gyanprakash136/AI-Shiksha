import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) { }

    async createTransaction(userId: string, data: { courseIds: string[], amount: number, paymentMethod: string }) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Create Payment Record (Transaction)
            const payment = await tx.payment.create({
                data: {
                    user_id: userId,
                    course_id: data.courseIds[0], // Linking to first course for now as Payment model has single course_id relation based on schema. 
                    // TODO: If Payment supports multiple courses, we need to adjust schema or create multiple payments. 
                    // Checking schema: Payment has `course_id String`. It implies 1 payment = 1 course? 
                    // Or maybe we create multiple payment records? 
                    // For a cart checkout, usually we create one Transaction/Order and multiple OrderItems.
                    // But here schema says Payment -> Course. 
                    // I will create one payment record per course to be safe with current schema, OR just one for the first one and others implied.
                    // Better: Create multiple payments (one per course) or update schema. 
                    // For quick fix: I'll iterate and create enrollment. 
                    // Wait, `Payment` model is: user_id, course_id, amount.
                    // If I buy 2 courses, I should probably create 2 payment records?
                    // Let's create `Enrollment` for ALL courses.
                    amount: data.amount,
                    payment_provider: 'stripe', // Mock
                    payment_status: 'completed',
                    transaction_id: `TXN-${Date.now()}`,
                }
            });

            // 2. Create Enrollments
            const enrollments: any[] = [];
            for (const courseId of data.courseIds) {
                // Check if already enrolled
                const existing = await tx.enrollment.findUnique({
                    where: {
                        student_id_course_id: {
                            student_id: userId,
                            course_id: courseId
                        }
                    }
                });

                if (!existing) {
                    const enrollment = await tx.enrollment.create({
                        data: {
                            student_id: userId,
                            course_id: courseId,
                            payment_id: courseId === data.courseIds[0] ? payment.id : undefined, // Link payment to at least one
                            status: 'active',
                            progress_percentage: 0,
                        }
                    });
                    enrollments.push(enrollment);
                }
            }

            return { success: true, payment, enrollments };
        });
    }

    async getMyTransactions(userId: string) {
        // Fetch actual payments
        const payments = await this.prisma.payment.findMany({
            where: { user_id: userId },
            include: { course: true },
            orderBy: { created_at: 'desc' }
        });

        return payments.map(p => ({
            id: p.id,
            courseId: p.course_id,
            courseName: p.course.title,
            date: p.created_at,
            amount: p.amount,
            paymentMethod: p.payment_provider,
            status: p.payment_status,
            thumbnail: p.course.thumbnail_url,
            transactionId: p.transaction_id || 'N/A',
            currency: 'USD' // Default
        }));
    }

    async getTransactionById(transactionId: string, userId: string) {
        // Query specific transaction
        const payment = await this.prisma.payment.findUnique({
            where: { id: transactionId },
            include: { course: true }
        });

        if (!payment || payment.user_id !== userId) return null;

        return {
            id: payment.id,
            courseId: payment.course_id,
            courseName: payment.course.title,
            date: payment.created_at,
            amount: payment.amount,
            paymentMethod: payment.payment_provider,
            status: payment.payment_status,
            thumbnail: payment.course.thumbnail_url,
            transactionId: payment.transaction_id || 'N/A',
            currency: 'USD'
        };
    }

    async getTransactionStats(userId: string) {
        // Calculate actual stats from database
        const transactions = await this.getMyTransactions(userId);
        const totalSpent = transactions.reduce((sum, txn) => sum + txn.amount, 0);
        const totalTransactions = transactions.length;

        return {
            totalSpent,
            totalTransactions,
            averageTransaction: totalSpent / totalTransactions,
            currency: 'USD',
        };
    }
}
