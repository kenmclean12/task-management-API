import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientField, ClientHistoryEventType, Prisma } from '@prisma/client';

export class ClientHistoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ enum: ClientHistoryEventType })
  eventType: ClientHistoryEventType;

  @ApiPropertyOptional({ enum: ClientField, nullable: true })
  field: ClientField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  oldValue: Prisma.JsonValue | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  newValue: Prisma.JsonValue | null;

  @ApiProperty()
  createdAt: Date;
}
