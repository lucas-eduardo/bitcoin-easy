import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';
import { Request } from 'express';
import { SaleService } from '../services/sale.service';
import { SaleDto } from '../dto/sale.dto';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(
    @Req() { user }: Request,
    @Body() { amount }: { amount: number },
  ): Promise<SaleDto> {
    const result = await this.saleService.sellBtc(user.id, amount);
    return result;
  }
}
