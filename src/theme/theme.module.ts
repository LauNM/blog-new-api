import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeService } from './theme.service';
import { ThemeEntity } from './theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity])],
  controllers: [ThemeController],
  providers: [ThemeService],
})
export class ThemeModule {}
