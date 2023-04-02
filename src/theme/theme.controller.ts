import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/createThemeDto';
import { ThemeEntity } from './theme.entity';
import { UpdateThemeDto } from './dto/updateThemeDto';

@Controller('theme')
export class ThemeController {
  constructor(private themeService: ThemeService) {}
  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Get()
  findAll(): Promise<ThemeEntity[]> {
    return this.themeService.findAll();
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
  remove(@Param('id') id: number) {
    return this.themeService.remove(id);
  }
}
