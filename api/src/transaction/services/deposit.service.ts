import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/services/user.service';
import { ExtractService } from 'src/shared/services/extract.service';

@Injectable()
export class DepositService {
  constructor(
    private extractService: ExtractService,
    private userService: UserService,
  ) {}

  async insertDeposit(userId: number, amount: number): Promise<number> {
    await this.extractService.insertDeposit(userId, amount);

    const totalAmount = await this.userService.updateBalance(userId, amount);

    return totalAmount;
  }
}
