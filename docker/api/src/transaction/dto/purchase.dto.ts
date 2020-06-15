import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class PurchaseDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @Exclude()
  btcTotal: number;

  @IsNotEmpty()
  @IsNumber()
  @Exclude()
  btcBought: number;

  @IsNotEmpty()
  @IsNumber()
  @Exclude()
  balance: number;

  @Expose()
  get updateBalance(): string {
    return this.balance.toFixed(2);
  }

  @Expose()
  get acquiredBtc(): string {
    return this.btcBought.toFixed(10);
  }

  @Expose()
  get totalFractionBtc(): string {
    return this.btcTotal.toFixed(10);
  }

  constructor(partial: Partial<PurchaseDto>) {
    Object.assign(this, partial);
  }
}
