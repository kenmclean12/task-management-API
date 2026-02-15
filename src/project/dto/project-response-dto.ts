import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority, ProjectStatus } from '@prisma/client';
import { UserResponseDto } from 'src/user/dto';

export class ProjectResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ nullable: true })
  startDate: Date | null;

  @ApiPropertyOptional({ nullable: true })
  dueDate: Date | null;

  @ApiPropertyOptional({ nullable: true })
  finishDate: Date | null;

  @ApiProperty()
  priority: Priority;

  @ApiProperty()
  status: ProjectStatus;

  @ApiProperty()
  clientId: number;

  @ApiPropertyOptional({ type: () => [UserResponseDto] })
  assignedTo?: UserResponseDto[];
}
