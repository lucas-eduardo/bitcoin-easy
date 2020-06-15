import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

// Guard
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';

// Services
import { DepositService } from '../services/deposit.service';

// Dtos
import { DepositStoreDto } from '../dto/deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(
    @Req() { user }: Request,
    @Body() { value }: DepositStoreDto,
  ): Promise<{ amout: number }> {
    const amout = await this.depositService.insertDeposit(user.id, value);
    return { amout };
  }
}
