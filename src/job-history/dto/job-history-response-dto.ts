import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobField, JobHistoryEventType, Prisma } from '@prisma/client';

export class JobHistoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ enum: JobHistoryEventType })
  eventType: JobHistoryEventType;

  @ApiPropertyOptional({ enum: JobField, nullable: true })
  field: JobField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  oldValue: Prisma.JsonValue | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  newValue: Prisma.JsonValue | null;

  @ApiProperty()
  createdAt: Date;
}
