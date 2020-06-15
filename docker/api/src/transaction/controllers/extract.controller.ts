import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';
import { ExtractEntity } from 'src/shared/entity/extract.entity';
import { ExtractService } from 'src/shared/services/extract.service';

@Controller('extract')
export class ExtractController {
  constructor(private extractService: ExtractService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Req() { user }: Request): Promise<ExtractEntity[]> {
    const result = await this.extractService.findExtractFromTheLastNinetyDays(
      user.id,
    );

    return result;
  }
}
