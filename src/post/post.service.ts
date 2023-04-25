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

  async findAll(themeId: number, searchQuery: string): Promise<PostEntity[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'themes');

    if (themeId) {
      queryBuilder.where('themes.id = :themeId', { themeId });
    }
    if (searchQuery) {
      queryBuilder.andWhere('post.title ILIKE :search', {
        search: `%${searchQuery}%`,
      });
    }
    return queryBuilder.getMany();
    /*const posts = await queryBuilder.getMany();
    return posts.map((post) => {
      return {
        ...post,
        themes: post.themes.map((theme) => theme.id),
      };
    });*/
  }

  async find(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.themes', 'theme')
      .where('post.id = :id', { id })
      .getOne();
  }

  /* async find(id: number) {
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
  }*/
  //find solution for update AND later : post
  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    let post = await this.find(id);
    if (data.themes) {
      post.themes = data.themes;
    }
    post = this.postRepository.merge(post, data);
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
