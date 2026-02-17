import { Prisma, ProjectField, ProjectHistoryEventType } from '@prisma/client';
import { ProjectResponseDto, ProjectUpdateDto } from '../dto';
import { ProjectHistoryService } from 'src/project-history/project-history.service';

export async function createUpdateHistory(
  actorId: number,
  projectId: number,
  project: ProjectResponseDto,
  dto: ProjectUpdateDto,
  projectHistoryService: ProjectHistoryService,
) {
  const eventTypeMap: Record<keyof ProjectUpdateDto, ProjectHistoryEventType> =
    {
      name: ProjectHistoryEventType.NAME_CHANGED,
      description: ProjectHistoryEventType.DESCRIPTION_CHANGED,
      status: ProjectHistoryEventType.STATUS_CHANGED,
      priority: ProjectHistoryEventType.PRIORITY_CHANGED,
      startDate: ProjectHistoryEventType.START_DATE_CHANGED,
      dueDate: ProjectHistoryEventType.DUE_DATE_CHANGED,
      finishDate: ProjectHistoryEventType.FINISH_DATE_CHANGED,
      assignedToUserIds: ProjectHistoryEventType.ASSIGNED_USERS_CHANGED,
    };

  const changedFields = Object.keys(dto).filter((k) => {
    const key = k as keyof ProjectUpdateDto;

    if (key === 'assignedToUserIds') {
      const oldIds = project.assignedTo?.map((u) => u.id).sort() ?? [];
      const newIds = dto.assignedToUserIds?.sort() ?? [];
      return JSON.stringify(oldIds) !== JSON.stringify(newIds);
    }

    return (
      dto[key as keyof ProjectUpdateDto] !==
      project[key as keyof ProjectResponseDto]
    );
  });

  for (const field of changedFields) {
    const key = field as keyof ProjectUpdateDto;

    let oldValue: Prisma.InputJsonValue | null;
    let newValue: Prisma.InputJsonValue | null;

    if (key === 'assignedToUserIds') {
      oldValue = project.assignedTo?.map((u) => u.id).sort() ?? [];
      newValue = dto.assignedToUserIds?.sort() ?? [];
    } else {
      oldValue = (project[key] as Prisma.InputJsonValue) ?? null;
      newValue = (dto[key] as Prisma.InputJsonValue) ?? null;
    }

    await projectHistoryService.create({
      projectId,
      actorId,
      eventType: eventTypeMap[key],
      field: key === 'assignedToUserIds' ? null : (key as ProjectField),
      oldValue,
      newValue,
    });
  }
}
