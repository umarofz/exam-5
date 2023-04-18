import { Controller, Get, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getUploadedBooks(@Request() req: Request) {
    return this.profileService.getUploadedBooks(req);
  }
}
