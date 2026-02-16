import { Prisma } from '@prisma/client';
import { JobResponseDto } from '../dto';
import { userToResponse } from 'src/user/utils';

type JobWithUsers = Prisma.JobGetPayload<{ include: { assignedTo: true } }>;

export function jobToResponse(job: JobWithUsers): JobResponseDto {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    startDate: job.startDate,
    dueDate: job.dueDate,
    finishDate: job.finishDate,
    priority: job.priority,
    status: job.status,
    projectId: job.projectId,
    assignedTo: job.assignedTo.map((u) => userToResponse(u)),
  };
}
