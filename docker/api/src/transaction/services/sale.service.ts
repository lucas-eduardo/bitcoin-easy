import { Injectable, BadRequestException } from '@nestjs/common';
import { ExtractService } from 'src/shared/services/extract.service';
import { BalanceService } from './balance.service';
import { PriceService } from './price.service';
import { SaleDto } from '../dto/sale.dto';

@Injectable()
export class SaleService {
  constructor(
    private extractService: ExtractService,
    private balanceService: BalanceService,
    private priceService: PriceService,
  ) {}

  async sellBtc(userId: number, amount: number): Promise<SaleDto> {
    const totalBtc = await this.balanceService.findBtc(userId);
    const totalBalance = await this.balanceService.findBalance(userId);
    const { buy, sell } = await this.priceService.purchaseAndSaleValue();

    const valueDecimal = buy * totalBtc;

    if (valueDecimal < amount || amount / buy > totalBtc) {
      throw new BadRequestException();
    }

    const fraction = totalBtc - amount / buy;

    const salePrice = fraction * sell;

    const value = {
      userId,
      balance: Number(totalBalance) + Number(salePrice),
      btcTotal: fraction
    };

    await this.extractService.insertSell(userId, amount, buy, sell, fraction);

    const { balance, btcTotal } = await this.balanceService.updateBalanceAndBtc(
      value.userId,
      value.balance,
      value.btcTotal
    );

    return { balance, btcTotal, salePrice };
  }
}
