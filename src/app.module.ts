import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorModule } from './modules/author/author.module';
import { BooksModule } from './modules/books/books.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5432,
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    AuthorModule,
    BooksModule,
    CommentsModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
