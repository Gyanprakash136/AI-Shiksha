import api from '@/lib/api';

export interface StudentMetrics {
    coursesEnrolled: number;
    hoursLearned: number;
    certificatesEarned: number;
}

export interface ResumeCourse {
    courseId: string;
    courseName: string;
    courseSlug: string;
    lessonId: string;
    lessonSlug: string;
    lessonTitle: string;
    progress: number;
    thumbnail: string | null;
}

export interface Milestone {
    nextMilestone: string;
    progress: number;
    total: number;
    reward: string;
}

export interface WeeklyGoal {
    targetHours: number;
    completedHours: number;
    progress: number;
    total: number; // Added to match likely backend response or UI needs
}

export interface Meeting {
    id: number;
    title: string;
    date: string;
    instructor: string;
}

export const dashboardService = {
    async getMetrics(): Promise<StudentMetrics> {
        const response = await api.get('/students/metrics');
        return response.data;
    },

    async getResumeCourse(): Promise<ResumeCourse> {
        const response = await api.get('/students/resume-course');
        return response.data;
    },

    async getMilestones(): Promise<Milestone & { milestones?: any[] }> {
        const response = await api.get('/students/milestones');
        return response.data;
    },

    async addMilestone(data: { title: string; targetDate?: string }): Promise<any> {
        const response = await api.post('/students/milestones', data);
        return response.data;
    },

    async completeMilestone(id: string): Promise<any> {
        const response = await api.patch(`/students/milestones/${id}/complete`);
        return response.data;
    },

    async getWeeklyGoal(): Promise<WeeklyGoal> {
        const response = await api.get('/students/weekly-goal');
        return response.data;
    },

    async updateWeeklyGoal(targetHours: number): Promise<any> {
        const response = await api.post('/students/weekly-goal', { targetHours });
        return response.data;
    },

    async getMeetings(): Promise<Meeting[]> {
        const response = await api.get('/students/meetings');
        return response.data;
    },
};

