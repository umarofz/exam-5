import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { resolve } from 'path';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: resolve(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
  )
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authorService.create(createAuthorDto, file);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Post(':id/books')
  findOne(@Param('id') id: string, @Body() body: any) {
    return this.authorService.findOne(+id, body);
  }

  @Get(':id')
  findOneAuthor(@Param('id') id: string) {
    return this.authorService.findOneAuthor(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
