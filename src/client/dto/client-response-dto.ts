import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressResponseDto } from 'src/address/dto';

export class ClientResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ nullable: true })
  email: string | null;

  @ApiPropertyOptional({ nullable: true })
  phone: string | null;

  @ApiPropertyOptional({ nullable: true })
  website: string | null;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiPropertyOptional({ type: () => AddressResponseDto, nullable: true })
  address?: AddressResponseDto | null;
}
