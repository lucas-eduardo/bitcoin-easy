import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'extract' })
export class ExtractEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty()
  userId: number;

  @Column({ type: 'enum', enum: ['deposit', 'investment', 'sold'] })
  @IsNotEmpty()
  type: 'deposit' | 'investment' | 'sold';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deposit?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amountInvested?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valueSold?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  btcValuePurchased?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  btcValueSold?: number;

  @Column({ type: 'decimal', precision: 10, scale: 10, nullable: true })
  btcTotal?: number;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
