import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { BookingStatus, PaymentStatus, UserRole } from '../common/constants/enums';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, userId: string) {
    // Check if booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id: createPaymentDto.bookingId },
      include: {
        client: true,
        provider: true,
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user is the client of this booking
    if (booking.clientId !== userId) {
      throw new ForbiddenException('You can only make payments for your own bookings');
    }

    // Check if booking is in a valid state for payment
    if (booking.status !== BookingStatus.PENDING && booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException(`Cannot make payment for booking with status ${booking.status}`);
    }

    // Check if payment amount matches service price
    if (createPaymentDto.amount !== booking.service.price) {
      throw new BadRequestException('Payment amount must match service price');
    }

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        amount: createPaymentDto.amount,
        currency: 'USD', // Default currency
        paymentMethod: createPaymentDto.paymentMethod,
        status: PaymentStatus.PENDING,
        transactionId: createPaymentDto.transactionId,
        booking: {
          connect: { id: booking.id },
        },
      },
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // In a real application, we would integrate with a payment gateway here
    // For now, we'll simulate a successful payment
    const updatedPayment = await this.simulatePaymentProcessing(payment.id);

    return updatedPayment;
  }

  private async simulatePaymentProcessing(paymentId: string) {
    // In a real application, this would be handled by a payment gateway webhook
    // For now, we'll simulate a successful payment after a short delay
    
    // Update payment status to COMPLETED
    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.COMPLETED,
      },
      include: {
        booking: {
          include: {
            client: true,
            provider: true,
          },
        },
      },
    });

    // Update booking status to CONFIRMED
    await this.prisma.booking.update({
      where: { id: payment.bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
      },
    });

    // Get client and provider wallets
    const clientWallet = await this.prisma.wallet.findUnique({
      where: { userId: payment.booking.clientId },
    });

    const providerWallet = await this.prisma.wallet.findUnique({
      where: { userId: payment.booking.providerId },
    });

    if (!clientWallet || !providerWallet) {
      throw new NotFoundException('Client or provider wallet not found');
    }

    // Create transaction records for client and provider
    // Client transaction (payment)
    await this.prisma.transaction.create({
      data: {
        amount: payment.amount,
        type: 'PAYMENT',
        description: `Payment for booking #${payment.bookingId}`,
        wallet: {
          connect: { id: clientWallet.id },
        },
        payment: {
          connect: { id: payment.id },
        },
      },
    });

    // Provider transaction (commission)
    await this.prisma.transaction.create({
      data: {
        amount: payment.amount,
        type: 'COMMISSION',
        description: `Payment received for booking #${payment.bookingId}`,
        wallet: {
          connect: { id: providerWallet.id },
        },
        payment: {
          connect: { id: payment.id },
        },
      },
    });

    return this.findOne(payment.id, payment.booking.clientId);
  }

  async findAll(userId: string, role: UserRole) {
    // Determine filter based on user role
    const filter = {
      booking: {}
    };
    
    if (role === UserRole.CLIENT) {
      filter.booking['clientId'] = userId;
    } else if (role === UserRole.PROVIDER) {
      filter.booking['providerId'] = userId;
    }

    return this.prisma.payment.findMany({
      where: filter,
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Check if user is either the client or provider of this payment
    if (payment.booking.clientId !== userId && payment.booking.providerId !== userId) {
      throw new ForbiddenException('You can only view your own payments');
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, userId: string, role: UserRole) {
    // Check if payment exists
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Only admin or provider can update payment status
    if (role !== UserRole.ADMIN && role !== UserRole.PROVIDER) {
      throw new ForbiddenException('Only admin or provider can update payment status');
    }

    // If provider, check if they are the provider of this payment
    if (role === UserRole.PROVIDER && payment.booking.providerId !== userId) {
      throw new ForbiddenException('You can only update payments for your services');
    }

    // Update payment
    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // If payment status is updated to COMPLETED, update booking status to CONFIRMED
    if (updatePaymentDto.status === PaymentStatus.COMPLETED && payment.status !== PaymentStatus.COMPLETED) {
      await this.prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      });
    }

    return updatedPayment;
  }

  async remove(id: string, userId: string, role: UserRole) {
    // Check if payment exists
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Only admin can delete payments
    if (role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin can delete payments');
    }

    // Delete payment
    await this.prisma.payment.delete({
      where: { id },
    });

    return { message: 'Payment deleted successfully' };
  }
}