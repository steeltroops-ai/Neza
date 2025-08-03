import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Service for managing user operations including CRUD operations and user management.
 * Handles user creation, retrieval, updates, and deletion with proper validation.
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user with hashed password and associated wallet.
   * @param registerDto - User registration data
   * @returns Created user object without password
   * @throws ConflictException when email already exists
   */
  async create(registerDto: RegisterDto) {
    const { email, password, ...rest } = registerDto;

    // Check if user with email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...rest,
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
      include: {
        wallet: true,
      },
    });

    // Remove password from response
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Retrieves all users with selected fields (excludes sensitive data).
   * @returns Array of user objects with public information
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        wallet: true,
      },
    });
  }

  /**
   * Finds a user by their ID.
   * @param id - User's unique identifier
   * @returns User object with wallet information
   * @throws NotFoundException when user doesn't exist
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Finds a user by their email address.
   * @param email - User's email address
   * @returns User object with wallet information or null if not found
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        wallet: true,
      },
    });
  }

  /**
   * Updates user information with validation.
   * @param id - User's unique identifier
   * @param updateUserDto - Updated user data
   * @returns Updated user object without password
   * @throws NotFoundException when user doesn't exist
   * @throws ConflictException when email is already in use
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    await this.findOne(id);

    // If updating email, check if new email is already in use
    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    // If updating password, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        wallet: true,
      },
    });

    // Remove password from response
    const { password, ...result } = updatedUser;
    return result;
  }

  /**
   * Deletes a user from the system.
   * @param id - User's unique identifier
   * @returns Success message
   * @throws NotFoundException when user doesn't exist
   */
  async remove(id: string) {
    // Check if user exists
    await this.findOne(id);

    // Delete user
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}