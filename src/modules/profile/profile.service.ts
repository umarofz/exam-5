import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Book } from '../../entities/book.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    private readonly jwtService: JwtService,
  ) {}

  async getUploadedBooks(req: Request) {
    // @ts-ignore
    const { userId } = this.jwtService.verify(req.headers.authorization);
    const books = await this.bookRepo.find({ where: { userId } });
    console.log(userId);
    return books;
  }
}
