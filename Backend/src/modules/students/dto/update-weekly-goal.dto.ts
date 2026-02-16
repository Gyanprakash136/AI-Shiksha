import { IsNumber, Min } from 'class-validator';

export class UpdateWeeklyGoalDto {
    @IsNumber()
    @Min(1)
    targetHours: number;
}
