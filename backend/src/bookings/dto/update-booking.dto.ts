import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString, Min, IsEnum } from 'class-validator';
import { BookingStatus } from '../../common/constants/enums';

export class UpdateBookingDto {
  @ApiProperty({ example: '2023-12-01T10:00:00Z', description: 'The start date and time of the booking', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({ example: '2023-12-01T12:00:00Z', description: 'The end date and time of the booking', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ example: 2, description: 'The quantity of the service (hours, days, etc.)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiProperty({ example: 'I need help with my website design', description: 'Additional notes for the booking', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ 
    example: 'CONFIRMED', 
    description: 'The status of the booking', 
    enum: BookingStatus,
    required: false 
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}