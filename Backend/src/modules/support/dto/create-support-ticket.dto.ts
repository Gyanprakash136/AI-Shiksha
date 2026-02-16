export class CreateSupportTicketDto {
    subject: string;
    description: string;
    category: 'technical' | 'billing' | 'content' | 'account' | 'other';
    priority?: 'low' | 'medium' | 'high';
}
