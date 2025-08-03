import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/constants/enums';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CLIENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only clients can make payments' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid payment data' })
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentsService.create(createPaymentDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all payments for the current user' })
  @ApiResponse({ status: 200, description: 'Return all payments for the current user' })
  findAll(@Request() req) {
    return this.paymentsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Return payment by ID' })
  @ApiResponse({ status: 403, description: 'Forbidden - You can only view your own payments' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.paymentsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update payment' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admin or provider can update payments' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Request() req,
  ) {
    return this.paymentsService.update(id, updatePaymentDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete payment' })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admin can delete payments' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.paymentsService.remove(id, req.user.id, req.user.role);
  }
}