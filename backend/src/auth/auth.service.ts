import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Authentication service handling user login, registration, and token management.
 * Provides secure authentication using JWT tokens and bcrypt password hashing.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validates user credentials by checking email and password.
   * @param email - User's email address
   * @param password - Plain text password to validate
   * @returns User object without password if valid, null if invalid
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Authenticates user and generates access and refresh tokens.
   * @param loginDto - Login credentials containing email and password
   * @returns Object containing user data, access token, and refresh token
   * @throws UnauthorizedException when credentials are invalid
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    };
  }

  /**
   * Registers a new user and automatically logs them in.
   * @param registerDto - Registration data including email, password, and profile info
   * @returns Object containing new user data, access token, and refresh token
   */
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    };
  }

  /**
   * Generates new access and refresh tokens using a valid refresh token.
   * @param token - Valid refresh token
   * @returns Object containing new access token and refresh token
   * @throws UnauthorizedException when token is invalid or user not found
   */
  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      const newPayload = { sub: user.id, email: user.email, role: user.role };
      
      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: this.jwtService.sign(newPayload, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}