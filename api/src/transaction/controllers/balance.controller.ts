import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

// Guard
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';

// Services
import { BalanceService } from '../services/balance.service';

// Dtos
import { BalanceGetResponse } from '../dto/balance.dto';

@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async show(@Req() { user }: Request): Promise<BalanceGetResponse> {
    const {balance, btcTotal} = await this.balanceService.findBalanceAndBtc(user.id);

    return { balance, btcTotal };
  }
}
