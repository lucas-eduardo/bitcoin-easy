import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

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
  @IsDate()
  purchasedDate: Date;

  @Expose()
  get variation(): number {
    return this.currentPrice / this.purchasePrice;
  }

  constructor(partial: Partial<PositionDto>) {
    Object.assign(this, partial);
  }
}
