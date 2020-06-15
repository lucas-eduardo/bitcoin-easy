import { IsNumber, IsNotEmpty } from 'class-validator';

export class BitcoinMarketDto {
  @IsNumber()
  @IsNotEmpty()
  buy: number;

  @IsNumber()
  @IsNotEmpty()
  sell: number;
}
