import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeModule } from './theme/theme.module';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
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
