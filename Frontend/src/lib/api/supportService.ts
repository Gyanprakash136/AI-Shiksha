import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface SupportTicket {
    id: number;
    userId: number;
    subject: string;
    description: string;
    category: 'technical' | 'billing' | 'content' | 'account' | 'other';
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'pending' | 'closed';
    adminResponse: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketDto {
    subject: string;
    description: string;
    category: 'technical' | 'billing' | 'content' | 'account' | 'other';
    priority?: 'low' | 'medium' | 'high';
}

interface UpdateTicketDto {
    status?: 'open' | 'pending' | 'closed';
    adminResponse?: string;
}

export const supportService = {
    async createTicket(data: CreateTicketDto): Promise<SupportTicket> {
        const response = await axios.post(`${API_URL}/support/tickets`, data, {
            withCredentials: true,
        });
        return response.data;
    },

    async getMyTickets(): Promise<SupportTicket[]> {
        const response = await axios.get(`${API_URL}/support/tickets`, {
            withCredentials: true,
        });
        return response.data;
    },

    async getTicket(id: number): Promise<SupportTicket> {
        const response = await axios.get(`${API_URL}/support/tickets/${id}`, {
            withCredentials: true,
        });
        return response.data;
    },

    // Admin endpoints
    async getAllTickets(): Promise<SupportTicket[]> {
        const response = await axios.get(`${API_URL}/admin/support/tickets`, {
            withCredentials: true,
        });
        return response.data;
    },

    async updateTicket(id: number, data: UpdateTicketDto): Promise<SupportTicket> {
        const response = await axios.patch(`${API_URL}/admin/support/tickets/${id}`, data, {
            withCredentials: true,
        });
        return response.data;
    },

    async getTicketStats() {
        const response = await axios.get(`${API_URL}/admin/support/tickets/stats`, {
            withCredentials: true,
        });
        return response.data;
    },
};
