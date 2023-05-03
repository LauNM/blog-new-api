import { Length, IsString, IsNotEmpty } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title: string;
  @IsString()
  @IsNotEmpty()
  @Length(10, 255)
  summary: string;
  @IsString()
  @IsNotEmpty()
  @Length(10)
  content: string;
  @IsString()
  @IsNotEmpty()
  @Length(2)
  author: string;
}
