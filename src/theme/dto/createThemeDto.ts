import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title: string;
}
