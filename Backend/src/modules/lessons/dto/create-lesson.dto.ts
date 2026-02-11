import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  moduleId: string;

  @IsString()
  @IsOptional()
  video_url?: string;

  @IsOptional()
  content?: any; // JSON

  @IsNumber()
  @IsOptional()
  duration_seconds?: number;

  @IsNumber()
  position: number;

  @IsBoolean()
  @IsOptional()
  is_preview?: boolean;
}
