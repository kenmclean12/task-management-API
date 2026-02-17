import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority, Status } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto';

export class JobResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ nullable: true })
  startDate: Date | null;

  @ApiPropertyOptional({ nullable: true })
  dueDate: Date | null;

  @ApiPropertyOptional({ nullable: true })
  finishDate: Date | null;

  @ApiProperty()
  priority: Priority;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  projectId: number;

  @ApiProperty({ type: () => [UserResponseDto] })
  assignedTo: UserResponseDto[];
}
