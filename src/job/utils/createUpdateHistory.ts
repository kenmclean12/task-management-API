import { JobHistoryService } from 'src/job-history/job-history.service';
import { JobResponseDto, JobUpdateDto } from '../dto';
import { JobField, JobHistoryEventType, Prisma } from '@prisma/client';

export async function createUpdateHistory(
  actorId: number,
  jobId: number,
  job: JobResponseDto,
  dto: JobUpdateDto,
  jobHistoryService: JobHistoryService,
) {
  const eventTypeMap: Record<keyof JobUpdateDto, JobHistoryEventType> = {
    title: JobHistoryEventType.TITLE_CHANGED,
    description: JobHistoryEventType.DESCRIPTION_CHANGED,
    status: JobHistoryEventType.STATUS_CHANGED,
    priority: JobHistoryEventType.PRIORITY_CHANGED,
    startDate: JobHistoryEventType.START_DATE_CHANGED,
    dueDate: JobHistoryEventType.DUE_DATE_CHANGED,
    finishDate: JobHistoryEventType.FINISH_DATE_CHANGED,
    assignedToUserIds: JobHistoryEventType.ASSIGNED_USERS_CHANGED,
  };

  const changedFields = Object.keys(dto).filter((k) => {
    const key = k as keyof JobUpdateDto;
    if (key === 'assignedToUserIds') {
      const oldIds = job.assignedTo?.map((u) => u.id).sort() ?? [];
      const newIds = dto.assignedToUserIds?.sort() ?? [];
      return JSON.stringify(oldIds) !== JSON.stringify(newIds);
    }

    return dto[k as keyof JobUpdateDto] !== job[k as keyof JobResponseDto];
  });

  for (const field of changedFields) {
    const key = field as keyof JobUpdateDto;
    let oldValue: Prisma.InputJsonValue | null;
    let newValue: Prisma.InputJsonValue | null;

    if (key === 'assignedToUserIds') {
      oldValue = job.assignedTo?.map((u) => u.id).sort() ?? [];
      newValue = dto.assignedToUserIds?.sort() ?? [];
    } else {
      oldValue = (job[key] as Prisma.InputJsonValue) ?? null;
      newValue = (dto[key] as Prisma.InputJsonValue) ?? null;
    }

    await jobHistoryService.create({
      jobId,
      actorId,
      eventType: eventTypeMap[key],
      field: key === 'assignedToUserIds' ? null : (key as JobField),
      oldValue,
      newValue,
    });
  }
}
