import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto, file: Express.Multer.File) {
    const book = this.bookRepo.create({
      ...createBookDto,
      image: file.filename,
    });
    this.bookRepo.save(book);
    return book;
  }

  findAll() {
    return this.bookRepo.find({
      relations: { authors: true },
    });
  }

  findOne(id: number) {
    return this.bookRepo.findOne({
      where: { id },
      relations: { authors: true },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return this.bookRepo.delete({ id });
  }
}
