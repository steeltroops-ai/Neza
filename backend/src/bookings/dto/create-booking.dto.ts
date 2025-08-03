import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '2023-12-01T10:00:00Z', description: 'The start date and time of the booking' })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2023-12-01T12:00:00Z', description: 'The end date and time of the booking' })
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @ApiProperty({ example: 2, description: 'The quantity of the service (hours, days, etc.)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'I need help with my website design', description: 'Additional notes for the booking', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The service ID for the booking' })
  @IsNotEmpty()
  @IsString()
  serviceId: string;
}