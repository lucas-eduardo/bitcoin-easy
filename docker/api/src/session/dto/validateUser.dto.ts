import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class ValidateUserResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
