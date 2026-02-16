import { ApiProperty } from '@nestjs/swagger';
import { Priority, Status } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class JobCreateDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  assignedToUserIds?: number[];

  @ApiProperty({ example: 'Setup database' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Detailed description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  finishDate?: string;

  @ApiProperty()
  @IsOptional()
  priority?: Priority;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
