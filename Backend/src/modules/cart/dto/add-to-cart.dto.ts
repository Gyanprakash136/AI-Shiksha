import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
    @ApiProperty({ description: 'Course ID to add to cart' })
    @IsNotEmpty()
    @IsUUID()
    course_id: string;
}
