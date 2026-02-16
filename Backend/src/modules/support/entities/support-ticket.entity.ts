export class SupportTicket {
    id: number;
    userId: number;
    subject: string;
    description: string;
    category: string; // 'technical' | 'billing' | 'content' | 'account' | 'other'
    priority: string; // 'low' | 'medium' | 'high'
    status: string; // 'open' | 'pending' | 'closed'
    adminResponse: string | null;
    createdAt: Date;
    updatedAt: Date;
}
