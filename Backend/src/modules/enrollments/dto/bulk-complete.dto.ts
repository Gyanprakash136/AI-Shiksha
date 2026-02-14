import { IsArray, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkCompleteDto {
    @ApiProperty({
        description: 'Array of enrollment IDs to mark as complete',
        example: ['uuid-1', 'uuid-2', 'uuid-3'],
    })
    @IsArray()
    @IsString({ each: true })
    enrollment_ids: string[];

    @ApiProperty({
        description: 'Optional custom completion date (defaults to current date)',
        example: '2024-02-14T10:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    completion_date?: string;
}
