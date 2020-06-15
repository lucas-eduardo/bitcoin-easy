import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findBalance(userId: number): Promise<number> {
    const { balance } = await this.userRepository.findOne(userId);

    return balance;
  }

  async findBtc(userId: number): Promise<number> {
    const { btcTotal } = await this.userRepository.findOne(userId);

    return btcTotal;
  }

  async findBalanceAndBtc(userId: number): Promise<{balance: number, btcTotal: number}> {
    const { balance, btcTotal } = await this.userRepository.findOne(userId);

    return {balance: Number(balance), btcTotal: Number(btcTotal)};
  }

  async updateBalanceAndBtc(
    userId: number,
    balance: number,
    btcTotal: number,
    incrementBtc = false,
  ): Promise<{ balance: number; btcTotal: number }> {
    if (incrementBtc) {
      const { btcTotal: btcTotalCurrent } = await this.userRepository.findOne(
        userId,
      );

      btcTotal = Number(btcTotalCurrent) + Number(btcTotal);
    }

    await this.userRepository.update({ id: userId }, { balance, btcTotal });

    return { balance, btcTotal };
  }
}
