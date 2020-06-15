import { Injectable, BadRequestException } from '@nestjs/common';
import { ExtractService } from 'src/shared/services/extract.service';
import { BalanceService } from './balance.service';
import { PriceService } from './price.service';
import { PurchaseDto } from '../dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private extractService: ExtractService,
    private balanceService: BalanceService,
    private priceService: PriceService,
  ) {}

  async purchase(userId: number, amount: number): Promise<PurchaseDto> {
    const currentBalance = await this.balanceService.findBalance(userId);

    if (amount > currentBalance) {
      throw new BadRequestException();
    }

    const { buy, sell } = await this.priceService.purchaseAndSaleValue();

    const acquiredFraction = amount / buy;

    await this.extractService.insertInvestment(
      userId,
      amount,
      buy,
      sell,
      acquiredFraction,
    );

    const newBalance = currentBalance - amount;

    const { balance, btcTotal } = await this.balanceService.updateBalanceAndBtc(
      userId,
      newBalance,
      acquiredFraction,
      true,
    );

    return new PurchaseDto({
      type: 'investment',
      btcBought: acquiredFraction,
      btcTotal,
      balance,
    });
  }
}
