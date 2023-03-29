import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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
}
