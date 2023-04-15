import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class ThemeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToMany(() => PostEntity, (post: PostEntity) => post.themes)
  public posts: PostEntity[];
}
