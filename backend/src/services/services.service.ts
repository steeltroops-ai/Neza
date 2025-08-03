import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UserRole } from '../common/constants/enums';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto, userId: string) {
    // Check if user is a provider
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.PROVIDER) {
      throw new ForbiddenException('Only providers can create services');
    }

    // Extract fields that are in the DTO but not directly in the Service model
    const { tags, rating, imageUrl, ...serviceData } = createServiceDto;

    // Create service
    return this.prisma.service.create({
      data: {
        ...serviceData,
        providerId: userId,
      },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async findAll(categoryId?: string, search?: string) {
    const where = {};
    
    if (categoryId) {
      where['categoryId'] = categoryId;
    }
    
    if (search) {
      where['OR'] = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.service.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        category: true,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async findByProvider(providerId: string) {
    return this.prisma.service.findMany({
      where: { providerId },
      include: {
        category: true,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, userId: string) {
    // Check if service exists and belongs to the user
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        provider: true,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only update your own services');
    }

    // Update service
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    // Check if service exists and belongs to the user
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        provider: true,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only delete your own services');
    }

    // Delete service
    await this.prisma.service.delete({
      where: { id },
    });

    return { message: 'Service deleted successfully' };
  }
}