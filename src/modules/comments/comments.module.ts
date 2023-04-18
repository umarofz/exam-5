import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { JwtMiddleware } from '../../middlewares/checkToken';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, UserEntity]),
    JwtModule.register({ secret: 'olma' }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/comments');
  }
}
