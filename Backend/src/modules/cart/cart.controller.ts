import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('add')
    @ApiOperation({ summary: 'Add course to cart' })
    addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(req.user.userId, addToCartDto.course_id);
    }

    @Get()
    @ApiOperation({ summary: 'Get cart items' })
    getCart(@Request() req) {
        return this.cartService.getCart(req.user.userId);
    }

    @Get('count')
    @ApiOperation({ summary: 'Get cart item count' })
    getCartCount(@Request() req) {
        return this.cartService.getCartItemCount(req.user.userId);
    }

    @Delete(':courseId')
    @ApiOperation({ summary: 'Remove course from cart' })
    removeFromCart(@Request() req, @Param('courseId') courseId: string) {
        return this.cartService.removeFromCart(req.user.userId, courseId);
    }

    @Delete()
    @ApiOperation({ summary: 'Clear cart' })
    clearCart(@Request() req) {
        return this.cartService.clearCart(req.user.userId);
    }
}
