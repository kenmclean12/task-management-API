import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressHistoryEventType, AddressField, Prisma } from '@prisma/client';

export class AddressHistoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  addressId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ enum: AddressHistoryEventType })
  eventType: AddressHistoryEventType;

  @ApiPropertyOptional({ enum: AddressField, nullable: true })
  field: AddressField | null;

  @ApiPropertyOptional({ type: Object, nullable: true })
  oldValue: Prisma.JsonValue | null;

  @ApiPropertyOptional({ type: Object, nullable: true })
  newValue: Prisma.JsonValue | null;

  @ApiProperty()
  createdAt: Date;
}
