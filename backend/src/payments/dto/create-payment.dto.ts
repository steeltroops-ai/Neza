import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 100, description: 'The payment amount' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ 
    example: 'CREDIT_CARD', 
    description: 'The payment method', 
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PAYPAL', 'WALLET', 'CASH']
  })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: 'txn_123456789', description: 'The transaction ID from the payment processor', required: false })
  @IsString()
  transactionId?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The booking ID for the payment' })
  @IsNotEmpty()
  @IsString()
  bookingId: string;
}