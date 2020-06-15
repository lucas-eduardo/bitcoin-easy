import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entitys
import { ExtractEntity } from './entity/extract.entity';

// Services
import { ExtractService } from './services/extract.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExtractEntity])],
  exports: [ExtractService],
  providers: [ExtractService],
})
export class SharedModule {}
