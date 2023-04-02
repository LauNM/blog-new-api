import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeModule } from './theme/theme.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ThemeModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'blog',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
