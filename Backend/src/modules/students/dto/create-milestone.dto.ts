import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateMilestoneDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsOptional()
    targetDate?: string;
}
