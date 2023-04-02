import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/updatePostDto';
import { CreatePostDto } from './dto/createPostDto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post: PostEntity = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }
  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }
  find(id: number): Promise<PostEntity> {
    return this.postRepository.findOneBy({ id: id });
  }
  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    let post = await this.find(id);
    post = this.postRepository.merge(post, data);
    return this.postRepository.save(post);
  }
  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
