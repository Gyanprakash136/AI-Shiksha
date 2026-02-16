import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get leaderboard rankings' })
    getLeaderboard(@Query('period') period?: 'weekly' | 'monthly' | 'all-time') {
        return this.leaderboardService.getLeaderboard(period || 'all-time');
    }

    @Get('my-rank')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user rank' })
    getMyRank(@Request() req) {
        const userId = req.user?.id || 1;
        return this.leaderboardService.getUserRank(userId);
    }
}
