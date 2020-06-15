import { Module } from '@nestjs/common';

// Modules
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';

// Controllers
import { DepositController } from './controllers/deposit.controller';
import { BalanceController } from './controllers/balance.controller';
import { PriceController } from './controllers/price.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { PositionController } from './controllers/position.controller';
import { SaleController } from './controllers/sale.controller';
import { ExtractController } from './controllers/extract.controller';

// Services
import { DepositService } from './services/deposit.service';
import { BalanceService } from './services/balance.service';
import { PriceService } from './services/price.service';
import { PurchaseService } from './services/purchase.service';
import { PositionService } from './services/position.service';
import { SaleService } from './services/sale.service';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [
    DepositController,
    BalanceController,
    PriceController,
    PurchaseController,
    PositionController,
    SaleController,
    ExtractController,
  ],
  providers: [
    DepositService,
    BalanceService,
    PriceService,
    PurchaseService,
    PositionService,
    SaleService,
  ],
})
export class TransactionModule {}
