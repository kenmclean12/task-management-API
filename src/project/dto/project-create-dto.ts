import { ApiProperty } from '@nestjs/swagger';
import { Priority, ProjectStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProjectCreateDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  assignedToUserIds?: number[];

  @ApiProperty({ example: 'name1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'project description' })
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
  status?: ProjectStatus;
}
