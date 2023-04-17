import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsOptional()
  @IsString()
  password?: string;
}
