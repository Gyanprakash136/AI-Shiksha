import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get my transaction history' })
    getMyTransactions(@Request() req) {
        const userId = req.user.userId;
        return this.transactionsService.getMyTransactions(userId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new transaction (Purchase)' })
    createTransaction(@Request() req, @Body() body: { courseIds: string[], amount: number, paymentMethod: string }) {
        const userId = req.user.userId;
        return this.transactionsService.createTransaction(userId, body);
    }

    @Get('stats')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get transaction statistics' })
    getTransactionStats(@Request() req) {
        const userId = req.user.userId;
        return this.transactionsService.getTransactionStats(userId);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get transaction by ID' })
    getTransactionById(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        return this.transactionsService.getTransactionById(id, userId);
    }
}
