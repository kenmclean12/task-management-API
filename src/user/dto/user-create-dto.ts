import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsUrl,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @MaxLength(50)
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'password123',
  })
  @MaxLength(50)
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @MaxLength(30)
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @MaxLength(30)
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    description: 'Role of the user',
    example: Role.READONLY,
  })
  @IsEnum({ type: Role })
  role: Role;

  @ApiPropertyOptional({
    description: 'URL to the user avatar image',
    example: 'https://example.com/avatar.png',
  })
  @IsOptional()
  @IsString({ message: 'Avatar URL must be a string' })
  @IsUrl({}, { message: 'Avatar URL must be a valid URL' })
  avatarUrl?: string;
}
