import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindBalanceBtcDto {
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsNumber()
  @IsNotEmpty()
  btcTotal: number;
}
