import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompletionDateDto {
    @ApiProperty({
        description: 'New completion date to set',
        example: '2024-02-14T10:00:00Z',
    })
    @IsDateString()
    completion_date: string;
}
