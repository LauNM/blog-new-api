import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ThemeEntity } from '../theme/theme.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  summary: string;
  @Column()
  content: string;
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
