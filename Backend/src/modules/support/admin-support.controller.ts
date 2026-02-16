import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SupportService } from './support.service';
import { UpdateSupportTicketDto } from './dto/update-support-ticket.dto';

@Controller('admin/support/tickets')
export class AdminSupportController {
    constructor(private readonly supportService: SupportService) { }

    @Get()
    findAll() {
        return this.supportService.findAll();
    }

    @Get('stats')
    getStats() {
        return this.supportService.getStats();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateSupportTicketDto) {
        return this.supportService.update(+id, updateDto);
    }
}
