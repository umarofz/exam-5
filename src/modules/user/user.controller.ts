import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-profile-data.dto';
import { UpdateUserPasswordDto } from './dto/update-profile-pass.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  updateProfileData(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: Request,
  ) {
    return this.userService.updateProfileData(+id, updateUserDto, req);
  }

  @Patch(':id/changePassword')
  updateProfilePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
    @Request() req: Request,
  ) {
    return this.userService.updateProfilePassword(+id, updateUserDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
