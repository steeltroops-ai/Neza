import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max, IsArray } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({ example: 'Web Development', description: 'The title of the service', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Professional web development services', description: 'The description of the service', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50, description: 'The price of the service', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: 'USD', description: 'The currency of the price', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 'Hour', description: 'The unit of the service (Hour, Day, Project)', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

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

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The category ID of the service', required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;
}