import { IsNumber, IsNotEmpty } from 'class-validator';

export class DepositStoreDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
