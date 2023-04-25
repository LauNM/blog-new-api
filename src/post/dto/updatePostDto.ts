import { CreatePostDto } from './createPostDto';
import { PartialType } from '@nestjs/mapped-types';
import { ThemeEntity } from '../../theme/theme.entity';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  themes: ThemeEntity[];
}
