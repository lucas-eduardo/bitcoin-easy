import { IsNumber } from 'class-validator';

export class SaleDto {
  @IsNumber()
  balance: number;

  @IsNumber()
  btcTotal: number;

  @IsNumber()
  salePrice: number;
}
