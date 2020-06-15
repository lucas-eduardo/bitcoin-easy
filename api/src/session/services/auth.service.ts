import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/services/user.service';
import { SessionRequestDto, SessionResponseDto } from '../dto/session.dto';
import { ValidateUserResponseDto } from '../dto/validateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async session(user: SessionRequestDto): Promise<SessionResponseDto> {
    const payload = { email: user.email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
