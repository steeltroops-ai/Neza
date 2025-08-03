import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Category description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Category icon URL', required: false })
  @IsString()
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ description: 'Category image URL', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Category name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Category description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Category icon URL', required: false })
  @IsString()
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ description: 'Category image URL', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class CategoryResponseDto {
  @ApiProperty({ description: 'Category ID' })
  id: string;

  @ApiProperty({ description: 'Category name' })
  name: string;

  @ApiProperty({ description: 'Category description' })
  description: string;

  @ApiProperty({ description: 'Category icon URL', required: false })
  iconUrl?: string;

  @ApiProperty({ description: 'Category image URL', required: false })
  imageUrl?: string;

  @ApiProperty({ description: 'Number of services in this category' })
  serviceCount: number;

  @ApiProperty({ description: 'Popular service names in this category', type: [String] })
  @IsArray()
  @IsOptional()
  popularServices?: string[];
}