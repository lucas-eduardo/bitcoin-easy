import { Controller, Get } from '@nestjs/common';

// Services
import { PriceService } from '../services/price.service';

// Dtos
import { BitcoinMarketDto } from '../dto/bitcoinMarket.dto';

@Controller('btc')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get()
  async show(): Promise<BitcoinMarketDto> {
    const currencyValue = await this.priceService.purchaseAndSaleValue();

    return currencyValue;
  }
}
