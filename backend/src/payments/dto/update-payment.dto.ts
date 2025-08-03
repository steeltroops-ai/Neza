import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaymentStatus } from '../../common/constants/enums';

export class UpdatePaymentDto {
  @ApiProperty({ 
    example: 'COMPLETED', 
    description: 'The payment status', 
    enum: PaymentStatus,
    required: false 
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ 
    example: 'CREDIT_CARD', 
    description: 'The payment method', 
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'WALLET', 'CASH'],
    required: false 
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ 
    example: 'txn_123456789', 
    description: 'The transaction ID from the payment processor', 
    required: false 
  })
  @IsOptional()
  @IsString()
  transactionId?: string;
}