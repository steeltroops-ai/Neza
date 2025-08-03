import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus, UserRole } from '../common/constants/enums';

/**
 * Service for managing booking operations including creation, retrieval, updates, and deletion.
 * Handles booking validation, role-based permissions, and business logic.
 */
@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new booking for a service.
   * @param createBookingDto - Booking creation data
   * @param userId - ID of the user creating the booking
   * @returns Created booking with related data
   * @throws NotFoundException when user or service not found
   * @throws ForbiddenException when user is not a client
   * @throws BadRequestException when trying to book own service
   */
  async create(createBookingDto: CreateBookingDto, userId: string) {
    // Check if user exists and is a client
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.CLIENT) {
      throw new ForbiddenException('Only clients can create bookings');
    }

    // Check if service exists
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
      include: { provider: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Check if client is trying to book their own service
    if (service.providerId === userId) {
      throw new BadRequestException('You cannot book your own service');
    }

    // Calculate total amount
    const totalAmount = service.price * createBookingDto.quantity;

    // Create booking
    return this.prisma.booking.create({
      data: {
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
        status: BookingStatus.PENDING,
        notes: createBookingDto.notes,
        client: {
          connect: { id: userId },
        },
        provider: {
          connect: { id: service.providerId },
        },
        service: {
          connect: { id: service.id },
        },
      },
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
        service: true,
      },
    });
  }

  /**
   * Retrieves all bookings for a user based on their role.
   * @param userId - ID of the user requesting bookings
   * @param role - Role of the user (CLIENT or PROVIDER)
   * @returns Array of bookings with related data
   */
  async findAll(userId: string, role: UserRole) {
    // Determine filter based on user role
    const filter = {};
    
    if (role === UserRole.CLIENT) {
      filter['clientId'] = userId;
    } else if (role === UserRole.PROVIDER) {
      filter['providerId'] = userId;
    }

    return this.prisma.booking.findMany({
      where: filter,
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
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        service: true,
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Check if user is either the client or provider of this booking
    if (booking.clientId !== userId && booking.providerId !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, userId: string, role: UserRole) {
    // Check if booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Check permissions based on role and status update
    if (role === UserRole.CLIENT) {
      // Clients can only update their own bookings
      if (booking.clientId !== userId) {
        throw new ForbiddenException('You can only update your own bookings');
      }

      // Clients can only cancel bookings or update notes
      if (updateBookingDto.status && updateBookingDto.status !== BookingStatus.CANCELLED) {
        throw new ForbiddenException('Clients can only cancel bookings');
      }
    } else if (role === UserRole.PROVIDER) {
      // Providers can only update bookings for their services
      if (booking.providerId !== userId) {
        throw new ForbiddenException('You can only update bookings for your services');
      }

      // Providers cannot set status to CANCELLED (only clients can cancel)
      if (updateBookingDto.status === BookingStatus.CANCELLED) {
        throw new ForbiddenException('Only clients can cancel bookings');
      }
    }

    // Update booking
    return this.prisma.booking.update({
      where: { id },
      data: {
        ...updateBookingDto,
      },
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
        service: true,
      },
    });
  }

  async remove(id: string, userId: string, role: UserRole) {
    // Check if booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Only allow deletion if booking is in PENDING status
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only pending bookings can be deleted');
    }

    // Check permissions based on role
    if (role === UserRole.CLIENT) {
      // Clients can only delete their own bookings
      if (booking.clientId !== userId) {
        throw new ForbiddenException('You can only delete your own bookings');
      }
    } else if (role === UserRole.PROVIDER) {
      // Providers can only delete bookings for their services
      if (booking.providerId !== userId) {
        throw new ForbiddenException('You can only delete bookings for your services');
      }
    }

    // Delete booking
    await this.prisma.booking.delete({
      where: { id },
    });

    return { message: 'Booking deleted successfully' };
  }
}