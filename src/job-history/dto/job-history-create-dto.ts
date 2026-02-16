import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobField, JobHistoryEventType, Prisma } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class JobHistoryCreateDto {
  @ApiProperty()
  @IsInt()
  jobId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  actorId: number;

  @ApiProperty({ enum: JobHistoryEventType })
  @IsEnum(JobHistoryEventType)
  eventType: JobHistoryEventType;

  @ApiPropertyOptional({ enum: JobField, nullable: true })
  @IsOptional()
  @IsEnum(JobField)
  field?: JobField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  oldValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  newValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
