import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my enrollments' })
  findMyEnrollments(@Request() req) {
    return this.enrollmentsService.findMyEnrollments(req.user.userId);
  }
}
