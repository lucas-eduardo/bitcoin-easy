import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class SessionRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class SessionResponseDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
