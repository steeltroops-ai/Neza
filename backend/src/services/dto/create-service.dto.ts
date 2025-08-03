import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max, IsArray, IsBoolean } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Web Development', description: 'The title of the service' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Professional web development services', description: 'The description of the service' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 50, description: 'The price of the service' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 60, description: 'The duration of the service in minutes' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({ example: 'New York, NY', description: 'The location of the service', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: true, description: 'Whether the service can be provided remotely', required: false })
  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @ApiProperty({ example: true, description: 'Whether the service is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the service', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: ['JavaScript', 'React', 'Node.js'], description: 'Tags for the service', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: 4.5, description: 'The rating of the service', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The category ID of the service' })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}