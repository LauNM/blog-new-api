import { CreateThemeDto } from './createThemeDto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateThemeDto extends PartialType(CreateThemeDto) {}
