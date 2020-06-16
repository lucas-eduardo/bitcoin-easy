import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { subDays, addDays } from 'date-fns';

import { ExtractEntity } from '../entity/extract.entity';

@Injectable()
export class ExtractService {
  constructor(
    @InjectRepository(ExtractEntity)
    private extractRepository: Repository<ExtractEntity>,
  ) {}

  async findExtractFromTheLastNinetyDays(
    userId: number,
  ): Promise<ExtractEntity[]> {
    const startTime = new Date();
    const betweenDate = Between(subDays(startTime, 90), addDays(startTime, 1));
    const extract = await this.extractRepository.find({
      where: {
        userId,
        createdAt: betweenDate,
      },
      order: {
        createdAt: 'DESC',
      },
      cache: true,
    });

    return extract;
  }

  async findExtractInvestiment(userId: number): Promise<ExtractEntity[]> {
    const extract = await this.extractRepository.find({
      where: { userId, type: 'investment' },
      order: { createdAt: 'DESC' },
    });

    return extract;
  }

  async insertDeposit(userId: number, amount: number): Promise<void> {
    const transaction = this.extractRepository.create({
      type: 'deposit',
      userId,
      deposit: amount,
    });

    await this.extractRepository.save(transaction);
  }

  async insertInvestment(
    userId: number,
    amountInvested: number,
    btcValuePurchased: number,
    btcValueSold: number,
    btcTotal: number,
  ): Promise<void> {
    const transaction = this.extractRepository.create({
      userId,
      type: 'investment',
      amountInvested,
      btcValuePurchased,
      btcValueSold,
      btcTotal,
    });

    await this.extractRepository.save(transaction);
  }

  async insertSell(
    userId: number,
    valueSold: number,
    btcValuePurchased: number,
    btcValueSold: number,
    btcTotal: number,
  ): Promise<void> {
    const transaction = this.extractRepository.create({
      userId,
      type: 'sold',
      valueSold,
      btcValuePurchased,
      btcValueSold,
      btcTotal,
    });

    await this.extractRepository.save(transaction);
  }
}
