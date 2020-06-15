import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { FindBalanceBtcDto } from '../dto/findBalanceBtc.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async insertUser(data: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async updateBalance(userId: number, depositBalance: number): Promise<number> {
    const { balance } = await this.userRepository.findOne(userId);
    const total = Number(balance) + Number(depositBalance);
    await this.userRepository.update({ id: userId }, { balance: total });
    return total;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
}
