import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectField, ProjectHistoryEventType, Prisma } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ProjectHistoryCreateDto {
  @ApiProperty()
  @IsInt()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  actorId: number;

  @ApiProperty({ enum: ProjectHistoryEventType })
  @IsEnum(ProjectHistoryEventType)
  eventType: ProjectHistoryEventType;

  @ApiPropertyOptional({ enum: ProjectField, nullable: true })
  @IsOptional()
  @IsEnum(ProjectField)
  field?: ProjectField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  oldValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  newValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
