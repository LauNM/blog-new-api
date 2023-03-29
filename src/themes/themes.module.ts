import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Themes } from './themes.entity';
import { ThemesService } from './themes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Themes])],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
