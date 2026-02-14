import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty({ example: 'John' })
  @MaxLength(30)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @MaxLength(30)
  lastName: string;

  @ApiProperty({ example: Role.READONLY, enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string | null;
}
