import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddressCreateDto {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'Victoria' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'BC' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'Canada' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'V8V 1X1' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;
}
