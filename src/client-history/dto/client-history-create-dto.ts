import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientField, ClientHistoryEventType, Prisma } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ClientHistoryCreateDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  actorId: number;

  @ApiProperty({ enum: ClientHistoryEventType })
  @IsEnum(ClientHistoryEventType)
  eventType: ClientHistoryEventType;

  @ApiPropertyOptional({ enum: ClientField, nullable: true })
  @IsOptional()
  @IsEnum(ClientField)
  field?: ClientField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  oldValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  newValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
