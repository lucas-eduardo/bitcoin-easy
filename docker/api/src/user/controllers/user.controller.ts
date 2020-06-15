import { Controller, Post, Body } from '@nestjs/common';

// Services
import { UserService } from '../services/user.service';

// Dtos
import { CreateUserDto } from '../dto/createUser.dto';

// Entitys
import { UserEntity } from '../entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.insertUser(body);
    return user;
  }
}
