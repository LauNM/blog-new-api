import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeEntity } from './theme.entity';
import { CreateThemeDto } from './dto/createThemeDto';
import { UpdateThemeDto } from './dto/updateThemeDto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private themeRepository: Repository<ThemeEntity>,
  ) {}

  create(createThemeDto: CreateThemeDto) {
    const theme = this.themeRepository.create(createThemeDto);
    return this.themeRepository.save(theme);
  }
  findAll(): Promise<ThemeEntity[]> {
    return this.themeRepository.find();
  }
  find(id: number): Promise<ThemeEntity> {
    return this.themeRepository.findOneBy({ id: id });
  }
  async update(id: number, data: UpdateThemeDto): Promise<ThemeEntity> {
    let theme = await this.find(id);
    theme = this.themeRepository.merge(theme, data);
    return this.themeRepository.save(theme);
  }
  remove(id: number) {
    return this.themeRepository.delete(id);
  }
}
