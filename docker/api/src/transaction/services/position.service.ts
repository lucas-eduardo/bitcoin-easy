import { Injectable } from '@nestjs/common';
import { ExtractService } from 'src/shared/services/extract.service';
import { PriceService } from './price.service';
import { PositionDto } from '../dto/position.dto';

@Injectable()
export class PositionService {
  constructor(
    private extractService: ExtractService,
    private priceService: PriceService,
  ) {}

  async getPosition(userId: number): Promise<PositionDto[]> {
    const { buy, sell } = await this.priceService.purchaseAndSaleValue();

    const extract = await this.extractService.findExtractInvestiment(userId);

    const formatted = extract.map(item => {
      return new PositionDto({
        id: item.id,
        purchasePrice: item.btcValuePurchased,
        currentPrice: buy,
        purchasedBtcAmount: item.btcTotal,
        currentBtcAmount: item.amountInvested / buy,
        purchaseAmount: item.amountInvested,
        purchasedDate: item.createdAt,
        sellAmount: sell
      });
    });

    return formatted;
  }
}
