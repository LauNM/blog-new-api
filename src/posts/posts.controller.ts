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
import { UpdatePostDto } from './dto/updatePostDto';
import { CreatePostDto } from './dto/createPostDto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
  @Get()
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Posts> {
    return this.postsService.find(id);
  }
  @Patch('/:id')
  update(@Param('id') id: number, @Body() data: UpdatePostDto) {
    return this.postsService.update(id, data);
  }
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
