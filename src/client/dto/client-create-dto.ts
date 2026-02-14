import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ClientCreateDto {
  @ApiProperty({ example: 'Acme Inc.' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'hello@acme.com', nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional({ example: '+1-250-555-1234', nullable: true })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional({ example: 'https://acme.com', nullable: true })
  @IsOptional()
  @IsString()
  website?: string | null;

  @ApiPropertyOptional({ example: 'Construction client', nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;
}
