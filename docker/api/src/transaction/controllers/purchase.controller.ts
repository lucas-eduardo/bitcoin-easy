import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

// Guard
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';

// Services
import { PurchaseService } from '../services/purchase.service';
import { PurchaseDto } from '../dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(
    @Req() { user }: Request,
    @Body() { amount }: { amount: number },
  ): Promise<PurchaseDto> {
    const result = await this.purchaseService.purchase(user.id, amount);
    return result;
  }
}
