import { IsNumber } from 'class-validator';

export class BalanceGetResponse {
  @IsNumber()
  balance: number;

  @IsNumber()
  btcTotal: number;
}
