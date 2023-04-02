import { Length } from 'class-validator';
export class CreatePostDto {
  @Length(2, 40)
  title: string;
  @Length(10, 255)
  summary: string;
  @Length(10)
  content: string;
}
