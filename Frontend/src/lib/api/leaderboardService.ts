import api from '@/lib/api';

export interface LeaderboardUser {
    id: number;
    name: string;
    avatar: string | null;
    xp: number;
    rank: number;
    coursesCompleted: number;
    streak: number;
}

export interface UserRank {
    userId: number;
    rank: number;
    xp: number;
    coursesCompleted: number;
    streak: number;
    percentile: number;
}

export const leaderboardService = {
    async getLeaderboard(period: 'weekly' | 'monthly' | 'all-time' = 'all-time'): Promise<LeaderboardUser[]> {
        const response = await api.get('/leaderboard', {
            params: { period },
        });
        return response.data;
    },

    async getMyRank(): Promise<UserRank> {
        const response = await api.get('/leaderboard/my-rank');
        return response.data;
    },
};

