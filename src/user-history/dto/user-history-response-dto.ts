import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, UserField, UserHistoryEventType } from '@prisma/client';

export class UserHistoryResponseDto {
  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ enum: UserHistoryEventType })
  eventType: UserHistoryEventType;

  @ApiPropertyOptional({ enum: UserField, nullable: true })
  field: UserField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  oldValue: Prisma.JsonValue | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  newValue: Prisma.JsonValue | null;

  @ApiProperty()
  createdAt: Date;
}
