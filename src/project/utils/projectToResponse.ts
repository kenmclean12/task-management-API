import { Prisma } from '@prisma/client';
import { ProjectResponseDto } from '../dto';
import { userToResponse } from 'src/user/utils/userToResponse';

type ProjectWithUsers = Prisma.ProjectGetPayload<{
  include: { assignedTo: true };
}>;

export function projectToResponse(
  project: ProjectWithUsers,
): ProjectResponseDto {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt,
    startDate: project.startDate,
    dueDate: project.dueDate,
    finishDate: project.finishDate,
    priority: project.priority,
    status: project.status,
    clientId: project.clientId,

    assignedTo: project.assignedTo.map((u) => userToResponse(u)),
  };
}
