import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

  async findAll(themeId?: number): Promise<
    {
      id: number;
      title: string;
      content: string;
      summary: string;
      author: string;
      createdAt: Date;
      themes: number[];
    }[]
  > {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'themes');

    if (themeId) {
      queryBuilder.where('theme.id = :themeId', { themeId });
    }
    const posts = await queryBuilder.getMany();
    return posts.map((post) => {
      return {
        ...post,
        themes: post.themes.map((theme) => theme.id),
      };
    });
  }

  async findOne(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'theme')
      .where('post.id = :id', { id })
      .getOne();
  }

  async find(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'theme')
      .where('post.id = :id', { id })
      .getOne();

    return {
      ...post,
      themes: post.themes.map((theme) => {
        return theme.id;
      }),
    };
  }
  //find solution for update AND later : post
  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    let post = await this.findOne(id);
    post = this.postRepository.merge(post, data);
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
