import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectField, ProjectHistoryEventType, Prisma } from '@prisma/client';

export class ProjectHistoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty({ enum: ProjectHistoryEventType })
  eventType: ProjectHistoryEventType;

  @ApiPropertyOptional({ enum: ProjectField, nullable: true })
  field: ProjectField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  oldValue: Prisma.JsonValue | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  newValue: Prisma.JsonValue | null;

  @ApiProperty()
  createdAt: Date;
}
