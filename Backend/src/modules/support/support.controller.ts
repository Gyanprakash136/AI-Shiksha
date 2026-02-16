import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from './dto/update-support-ticket.dto';

@Controller('support/tickets')
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @Post()
    create(@Request() req, @Body() createDto: CreateSupportTicketDto) {
        const userId = req.user?.id || 1; // Get from auth guard
        return this.supportService.create(userId, createDto);
    }

    @Get()
    findAll(@Request() req) {
        const userId = req.user?.id;
        return this.supportService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.supportService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateSupportTicketDto) {
        return this.supportService.update(+id, updateDto);
    }
}
