import { IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ManualCompleteDto {
    @ApiProperty({
        description: 'Optional custom completion date (defaults to current date)',
        example: '2024-02-14T10:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    completion_date?: string;
}
