import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Expose, Transform, Exclude } from 'class-transformer';

export class PositionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(value => Number(value))
  purchasePrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(value => Number(value))
  currentPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(value => Number(value))
  purchasedBtcAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(value => Number(value))
  currentBtcAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(value => Number(value))
  purchaseAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Exclude()
  @Transform(value => Number(value))
  sellAmount: number;

  @IsNotEmpty()
  @IsDate()
  purchasedDate: Date;

  @Expose()
  get variation(): number {
    const diff = this.sellAmount - this.purchasePrice;
    const variation = diff / this.purchasePrice;
    return variation;
  }

  constructor(partial: Partial<PositionDto>) {
    Object.assign(this, partial);
  }
}
