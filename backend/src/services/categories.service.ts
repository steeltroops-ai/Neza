import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        icon: createCategoryDto.iconUrl,
        // Note: The schema uses 'icon' instead of 'iconUrl'
        // We're mapping the DTO field to the schema field
      },
    });

    return this.mapToCategoryResponseDto(category);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { services: true },
        },
      },
    });

    return Promise.all(categories.map(category => this.mapToCategoryResponseDto(category)));
  }

  async findPopular(limit: number = 6): Promise<CategoryResponseDto[]> {
    // Find categories with the most services
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { services: true },
        },
        services: {
          take: 4, // Take top 4 services for popular services list
          orderBy: {
            bookings: {
              _count: 'desc',
            },
          },
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        services: {
          _count: 'desc',
        },
      },
      take: limit,
    });

    return Promise.all(categories.map(category => this.mapToCategoryResponseDto(category)));
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { services: true },
        },
        services: {
          take: 4,
          orderBy: {
            bookings: {
              _count: 'desc',
            },
          },
          select: {
            title: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.mapToCategoryResponseDto(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    // Check if category exists
    await this.findOne(id);

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        ...(updateCategoryDto.name && { name: updateCategoryDto.name }),
        ...(updateCategoryDto.description && { description: updateCategoryDto.description }),
        ...(updateCategoryDto.iconUrl && { icon: updateCategoryDto.iconUrl }),
        // Note: The schema uses 'icon' instead of 'iconUrl'
      },
      include: {
        _count: {
          select: { services: true },
        },
      },
    });

    return this.mapToCategoryResponseDto(updatedCategory);
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if category exists
    await this.findOne(id);

    // Check if category has services
    const categoryWithServices = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { services: true },
        },
      },
    });

    if (categoryWithServices._count.services > 0) {
      throw new Error(`Cannot delete category with ID ${id} because it has associated services`);
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: `Category with ID ${id} has been deleted` };
  }

  private async mapToCategoryResponseDto(category: any): Promise<CategoryResponseDto> {
    const serviceCount = category._count?.services || 0;
    
    // Extract popular services
    let popularServices: string[] = [];
    if (category.services) {
      popularServices = category.services.map(service => service.title);
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description || '',
      iconUrl: category.icon || null,
      imageUrl: null, // The schema doesn't have imageUrl field
      serviceCount,
      popularServices,
    };
  }
}