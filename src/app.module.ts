import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesModule } from './themes/themes.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ThemesModule,
    PostsModule,
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
