import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { UpdatePostDto } from './dto/updatePostDto';
import { CreatePostDto } from './dto/createPostDto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }
  findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }
  find(id: number): Promise<Posts> {
    return this.postsRepository.findOneBy({ id: id });
  }
  async update(id: number, data: UpdatePostDto): Promise<Posts> {
    const post = await this.find(id);
    post.content = data.content;
    post.summary = data.summary;
    post.title = data.title;
    return this.postsRepository.save(post);
  }
  remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
