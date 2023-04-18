import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { Book } from '../../entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Book]),
    JwtModule.register({ secret: 'olma' }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
