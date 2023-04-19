import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/updatePostDto';
import { CreatePostDto } from './dto/createPostDto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  @Get()
  findAll(@Query('theme') themeId: number) {
    return this.postService.findAll(themeId);
  }
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.postService.find(id);
  }
  @Patch('/:id')
  update(@Param('id') id: number, @Body() data: UpdatePostDto) {
    return this.postService.update(id, data);
  }
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
