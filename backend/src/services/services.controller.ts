import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/constants/enums';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'Service created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only providers can create services' })
  create(@Body() createServiceDto: CreateServiceDto, @Request() req) {
    return this.servicesService.create(createServiceDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term for title or description' })
  @ApiResponse({ status: 200, description: 'Return all services' })
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ) {
    return this.servicesService.findAll(categoryId, search);
  }

  @Get('provider/:providerId')
  @ApiOperation({ summary: 'Get services by provider ID' })
  @ApiResponse({ status: 200, description: 'Return services by provider ID' })
  findByProvider(@Param('providerId') providerId: string) {
    return this.servicesService.findByProvider(providerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiResponse({ status: 200, description: 'Return service by ID' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service' })
  @ApiResponse({ status: 200, description: 'Service updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only update your own services' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req,
  ) {
    return this.servicesService.update(id, updateServiceDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete service' })
  @ApiResponse({ status: 200, description: 'Service deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only delete your own services' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.servicesService.remove(id, req.user.id);
  }
}