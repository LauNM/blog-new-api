import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Themes } from './themes.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Themes)
    private themesRepository: Repository<Themes>,
  ) {}

  findAll(): Promise<Themes[]> {
    return this.themesRepository.find();
  }
}
