import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/session/guards/jwt-auth.guard';
import { Request } from 'express';
import { PositionService } from '../services/position.service';
import { PositionDto } from '../dto/position.dto';

@Controller('position')
export class PositionController {
  constructor(private positionService: PositionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Req() { user }: Request): Promise<PositionDto[]> {
    const result = await this.positionService.getPosition(user.id);
    return result;
  }
}
