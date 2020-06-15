import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { BitcoinMarketDto } from '../dto/bitcoinMarket.dto';

@Injectable()
export class PriceService {
  async purchaseAndSaleValue(): Promise<BitcoinMarketDto> {
    const { data } = await axios.get<{ ticker: BitcoinMarketDto }>(
      process.env.API_BITCON_MARKET,
    );

    const { buy, sell } = data.ticker;

    return { buy, sell };
  }
}
