import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class ValidateJwtStrategyDto {
  @IsNotEmpty()
  @IsNumber()
  sub: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class ValidateJwtStrategyResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
