import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsOptional()
  headline?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
