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

  async findAll(themeId?: number): Promise<PostEntity[]> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if (themeId) {
      queryBuilder
        .leftJoin('post.themes', 'theme')
        .where('theme.id = :themeId', { themeId });
    }

    return await queryBuilder.getMany();
  }

  async find(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'theme')
      .where('post.id = :id', { id })
      .getOne();
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
