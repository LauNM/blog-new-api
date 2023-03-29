import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }
  find(id: number): Promise<Posts> {
    return this.postsRepository.findOneBy({ id: id });
  }
}
