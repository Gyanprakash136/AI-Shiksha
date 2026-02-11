import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  position: number;

  @IsString()
  courseId: string;
}
