import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, UserHistoryEventType, UserField } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UserHistoryCreateDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  actorId: number;

  @ApiProperty({ enum: UserHistoryEventType })
  @IsEnum(UserHistoryEventType)
  eventType: UserHistoryEventType;

  @ApiPropertyOptional({ enum: UserField, nullable: true })
  @IsOptional()
  @IsEnum(UserField)
  field?: UserField | null;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  oldValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @ApiPropertyOptional({ nullable: true, type: Object })
  @IsOptional()
  newValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
