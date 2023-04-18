import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createCommentDto: CreateCommentDto, req: Request) {
    // @ts-ignore
    const userId = this.jwtService.verify(req.headers.authorization);

    if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userId.userId)) {
      // @ts-ignore
      const email = this.jwtService.verify(req.headers.authorization);

      const userId = await this.userRepo.findOneBy({ email: email.userId });
      // @ts-ignore
      const post = this.commentRepo.create({
        book: createCommentDto.bookId,
        user: userId.id,
        comment: createCommentDto.comment,
      });
      this.commentRepo.save(post);
      return post;
    }

    const post = this.commentRepo.create({
      book: createCommentDto.bookId,
      user: userId.userId,
      comment: createCommentDto.comment,
    });
    this.commentRepo.save(post);
    return post;
  }

  findAll() {
    return this.commentRepo.find();
  }

  findOne(id: number) {
    return this.commentRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.commentRepo.delete({ id });
  }
}
