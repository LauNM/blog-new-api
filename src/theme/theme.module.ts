import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeService } from './theme.service';
import { ThemeEntity } from './theme.entity';
import { PostService } from '../post/post.service';
import { PostEntity } from '../post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeEntity]),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [ThemeController],
  providers: [ThemeService, PostService],
})
export class ThemeModule {}
