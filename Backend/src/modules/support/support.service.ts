import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from './dto/update-support-ticket.dto';
import { SupportTicket } from './entities/support-ticket.entity';

@Injectable()
export class SupportService {
    private tickets: SupportTicket[] = []; // In-memory store for now (will be replaced with database)
    private idCounter = 1;

    create(userId: number, createDto: CreateSupportTicketDto): SupportTicket {
        const ticket: SupportTicket = {
            id: this.idCounter++,
            userId,
            subject: createDto.subject,
            description: createDto.description,
            category: createDto.category,
            priority: createDto.priority || 'medium',
            status: 'open',
            adminResponse: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.tickets.push(ticket);
        return ticket;
    }

    findAll(userId?: number): SupportTicket[] {
        if (userId) {
            return this.tickets.filter(ticket => ticket.userId === userId);
        }
        return this.tickets;
    }

    findOne(id: number): SupportTicket {
        const ticket = this.tickets.find(t => t.id === id);
        if (!ticket) {
            throw new NotFoundException(`Ticket #${id} not found`);
        }
        return ticket;
    }

    update(id: number, updateDto: UpdateSupportTicketDto): SupportTicket {
        const ticket = this.findOne(id);

        if (updateDto.status) {
            ticket.status = updateDto.status;
        }
        if (updateDto.adminResponse !== undefined) {
            ticket.adminResponse = updateDto.adminResponse;
        }

        ticket.updatedAt = new Date();
        return ticket;
    }

    getStats() {
        const total = this.tickets.length;
        const open = this.tickets.filter(t => t.status === 'open').length;
        const pending = this.tickets.filter(t => t.status === 'pending').length;
        const closed = this.tickets.filter(t => t.status === 'closed').length;

        return {
            total,
            open,
            pending,
            closed,
            avgResponseTime: '~2 hrs', // Placeholder
        };
    }
}
