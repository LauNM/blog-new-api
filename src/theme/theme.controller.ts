import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException, NotFoundException
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { PostService } from '../post/post.service';
import { CreateThemeDto } from './dto/createThemeDto';
import { ThemeEntity } from './theme.entity';
import { UpdateThemeDto } from './dto/updateThemeDto';

@Controller('theme')
export class ThemeController {
  constructor(
    private themeService: ThemeService,
    private postService: PostService,
  ) {}

  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Get()
  findAll(@Query('search') searchQuery: string): Promise<ThemeEntity[]> {
    return this.themeService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ThemeEntity> {
    return this.themeService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateThemeDto) {
    return this.themeService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const theme = await this.themeService.find(id);
    if (!theme) {
      throw new NotFoundException('This theme does not exist');
    }
    const posts = await this.postService.findAll(id, null);
    if (posts.length > 0) {
      throw new ForbiddenException('This theme has posts linked to it');
    }

    await this.themeService.remove(id);
    return { message: 'Theme deleted successfully' };
  }
}
