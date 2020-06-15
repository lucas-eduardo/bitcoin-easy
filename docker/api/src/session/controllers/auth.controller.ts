import { Controller, UseGuards, Req, Post } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { SessionResponseDto } from '../dto/session.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request): Promise<SessionResponseDto> {
    return this.authService.session(req.user);
  }
}
