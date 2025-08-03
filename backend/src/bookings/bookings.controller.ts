import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/constants/enums';

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CLIENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only clients can create bookings' })
  @ApiResponse({ status: 400, description: 'Bad Request - Cannot book your own service' })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingsService.create(createBookingDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings for the current user' })
  @ApiResponse({ status: 200, description: 'Return all bookings for the current user' })
  findAll(@Request() req) {
    return this.bookingsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Return booking by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only view your own bookings' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.bookingsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only update your own bookings' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Request() req,
  ) {
    return this.bookingsService.update(id, updateBookingDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete booking' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Only pending bookings can be deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only delete your own bookings' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.bookingsService.remove(id, req.user.id, req.user.role);
  }
}