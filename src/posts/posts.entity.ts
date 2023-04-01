import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Themes } from '../themes/themes.entity';

@Entity()
export class Posts {
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
  @ManyToMany(() => Themes)
  @JoinTable()
  themes: Themes[];
}
