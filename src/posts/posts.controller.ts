import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  index(): Promise<Posts[]> {
    return this.postsService.findAll();
  }
  @Get('/:id')
  show(@Param('id') id: number): Promise<Posts> {
    return this.postsService.find(id);
  }
}
