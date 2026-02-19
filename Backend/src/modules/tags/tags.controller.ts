import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tag' })
  create(@Request() req, @Body() createTagDto: CreateTagDto) {
    const isSuperAdmin = req.user?.role === Role.SUPER_ADMIN || req.user?.role === 'SUPER_ADMIN';
    const franchiseId = isSuperAdmin ? null : (req.user?.franchise_id ?? null);
    return this.tagsService.create(createTagDto, franchiseId);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'List tags (franchise-scoped if authenticated)' })
  findAll(@Request() req) {
    const user = req.user;
    if (!user) {
      return this.tagsService.findAll(undefined);
    }
    const isSuperAdmin = user.role === Role.SUPER_ADMIN || user.role === 'SUPER_ADMIN';
    const franchiseId = isSuperAdmin ? undefined : (user.franchise_id ?? null);
    return this.tagsService.findAll(franchiseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tag details' })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.FRANCHISE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete tag (Admin only)' })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
