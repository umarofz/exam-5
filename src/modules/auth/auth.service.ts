import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(body: CreateUserDto) {
    const hash = await bcrypt.hash(body.password, 10);
    delete body.password;
    const newUser = { ...body, password: hash };
    const user = this.userRepo.create(newUser);
    this.userRepo.save(user);
    const token = this.jwtService.sign({ userId: user.id });
    return { access_token: token };
  }

  async validateUser(email, password) {
    const user = await this.userRepo.findOneBy({ email });
    // const hashedPassword = await bcrypt.hash(password, 10);
    // if (!user) {
    //   return null;
    // }
    // const isPasswordMatch = await bcrypt.compare(hashedPassword, user.password);
    // if (isPasswordMatch) {
    //   return user;
    // }
    // return null;
    const hash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }
}
