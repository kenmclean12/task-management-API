import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { AddressHistoryEventType, AddressField, Prisma } from '@prisma/client';

export class AddressHistoryCreateDto {
  @ApiProperty()
  @IsInt()
  addressId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  actorId: number;

  @ApiProperty({ enum: AddressHistoryEventType })
  @IsEnum(AddressHistoryEventType)
  eventType: AddressHistoryEventType;

  @ApiPropertyOptional({ enum: AddressField, nullable: true })
  @IsOptional()
  @IsEnum(AddressField)
  field?: AddressField | null;

  @ApiPropertyOptional({ type: Object, nullable: true })
  @IsOptional()
  oldValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;

  @ApiPropertyOptional({ type: Object, nullable: true })
  @IsOptional()
  newValue?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}
