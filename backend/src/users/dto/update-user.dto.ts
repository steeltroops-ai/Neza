import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Matches } from 'class-validator';
import { UserRole } from '../../common/constants/enums';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Password123!', description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  })
  password?: string;

  @ApiProperty({ example: 'CLIENT', description: 'The role of the user', enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}