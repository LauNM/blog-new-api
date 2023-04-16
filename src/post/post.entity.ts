import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ThemeEntity } from '../theme/theme.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  summary: string;
  @Column()
  content: string;
  @Column()
  author: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToMany(() => ThemeEntity, (theme: ThemeEntity) => theme.posts, {
    cascade: true,
  })
  @JoinTable({
    name: 'post_themes',
    joinColumn: {
      name: 'post',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'theme',
      referencedColumnName: 'id',
    },
  })
  themes: ThemeEntity[];
}
