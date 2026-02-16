import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@ApiTags('System Settings')
@Controller('system-settings')
export class SystemSettingsController {
    constructor(private readonly systemSettingsService: SystemSettingsService) { }

    @Get('terms')
    @ApiOperation({ summary: 'Get Terms and Conditions' })
    async getTerms() {
        return this.systemSettingsService.getTerms();
    }

    @Put('terms')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update Terms and Conditions (Admin only)' })
    async updateTerms(@Body('content') content: string) {
        return this.systemSettingsService.updateTerms(content);
    }
}
