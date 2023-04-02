import { Length } from 'class-validator';
export class CreateThemeDto {
  @Length(2, 40)
  title: string;
}
