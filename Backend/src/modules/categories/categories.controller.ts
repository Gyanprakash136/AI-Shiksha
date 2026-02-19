import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Optional,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.FRANCHISE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category (Admin only)' })
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    const isSuperAdmin = req.user?.role === Role.SUPER_ADMIN || req.user?.role === 'SUPER_ADMIN';
    const franchiseId = isSuperAdmin ? null : (req.user?.franchise_id ?? null);
    return this.categoriesService.create(createCategoryDto, franchiseId);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'List categories (franchise-scoped for admins, full list for public)' })
  findAll(@Request() req) {
    // Support both authenticated and unauthenticated access.
    // - Unauthenticated / public (visitor, student): show all categories
    // - Authenticated franchise admin: scope course-counts to their franchise
    // - Super admin: show all with global counts
    const user = req.user;
    if (!user) {
      return this.categoriesService.findAll(undefined);
    }
    const isSuperAdmin = user.role === Role.SUPER_ADMIN || user.role === 'SUPER_ADMIN';
    const franchiseId = isSuperAdmin ? undefined : (user.franchise_id ?? null);
    return this.categoriesService.findAll(franchiseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category details' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.FRANCHISE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category (Admin only)' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.FRANCHISE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category (Admin only)' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
