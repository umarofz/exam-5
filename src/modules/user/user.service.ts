import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    this.userRepo.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update({ id }, updateUserDto);
    return await this.userRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }
}
