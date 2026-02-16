import api from '@/lib/api';

export interface EnrolledCourse {
    id: string;
    courseId: string;
    userId: string;
    course: {
        id: string;
        slug: string;
        title: string;
        description: string;
        thumbnail_url: string | null;
        instructor: {
            name: string;
        };
        totalLessons: number;
        duration: string;
    };
    progress: number;
    completedLessons: number;
    lastAccessedAt: string | null;
    enrollmentDate: string;
    completionDate: string | null;
    status: 'not_started' | 'in_progress' | 'completed';
}

export const enrollmentService = {
    async getMyEnrollments(): Promise<EnrolledCourse[]> {
        const response = await api.get('/enrollments/my');
        return response.data;
    },
};

