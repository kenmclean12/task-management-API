import { Prisma, UserField, UserHistoryEventType } from '@prisma/client';
import { UserResponseDto, UserUpdateDto } from '../dto';
import { UserHistoryService } from 'src/user-history/user-history.service';

export async function createUpdateHistory(
  actorId: number,
  userId: number,
  user: UserResponseDto,
  dto: UserUpdateDto,
  userHistoryService: UserHistoryService,
) {
  const eventTypeMap: Record<keyof UserUpdateDto, UserHistoryEventType> = {
    email: UserHistoryEventType.EMAIL_CHANGED,
    firstName: UserHistoryEventType.FIRSTNAME_CHANGED,
    lastName: UserHistoryEventType.LASTNAME_CHANGED,
    avatarUrl: UserHistoryEventType.AVATARURL_CHANGED,
    role: UserHistoryEventType.ROLE_CHANGED,
  };

  const changedFields = Object.keys(dto).filter(
    (k) => dto[k as keyof UserUpdateDto] !== user[k as keyof UserUpdateDto],
  );

  for (const field of changedFields) {
    const key = field as keyof UserUpdateDto;

    await userHistoryService.create({
      userId,
      actorId,
      eventType: eventTypeMap[key],
      field: key as UserField,
      oldValue: (user[key] as Prisma.InputJsonValue) ?? null,
      newValue: (dto[key] as Prisma.InputJsonValue) ?? null,
    });
  }
}
