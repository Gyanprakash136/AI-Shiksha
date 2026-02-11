import { IsString, IsOptional, IsUUID } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string;

  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsUUID()
  @IsOptional()
  lessonId?: string;
}
