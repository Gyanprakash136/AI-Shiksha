import { Controller, Get, Post, Patch, Body, Request, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateWeeklyGoalDto } from './dto/update-weekly-goal.dto';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get('metrics')
    getMetrics(@Request() req) {
        const userId = req.user.userId;
        return this.studentsService.getMetrics(userId);
    }

    @Get('resume-course')
    getResumeCourse(@Request() req) {
        const userId = req.user.userId;
        return this.studentsService.getResumeCourse(userId);
    }

    @Get('milestones')
    getMilestones(@Request() req) {
        const userId = req.user.userId;
        return this.studentsService.getMilestones(userId);
    }

    @Post('milestones')
    addMilestone(@Request() req, @Body() dto: CreateMilestoneDto) {
        const userId = req.user.userId;
        return this.studentsService.addMilestone(userId, dto);
    }

    @Patch('milestones/:id/complete')
    completeMilestone(@Request() req, @Param('id') id: string) {
        const userId = req.user.userId;
        return this.studentsService.completeMilestone(userId, id);
    }

    @Get('weekly-goal')
    getWeeklyGoal(@Request() req) {
        const userId = req.user.userId;
        return this.studentsService.getWeeklyGoal(userId);
    }

    @Post('weekly-goal')
    updateWeeklyGoal(@Request() req, @Body() dto: UpdateWeeklyGoalDto) {
        const userId = req.user.userId;
        return this.studentsService.updateWeeklyGoal(userId, dto);
    }

    @Get('meetings')
    getMeetings(@Request() req) {
        const userId = req.user.userId;
        return this.studentsService.getMeetings(userId);
    }
}
