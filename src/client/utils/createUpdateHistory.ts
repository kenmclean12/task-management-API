import { ClientHistoryEventType, Prisma } from '@prisma/client';
import { ClientResponseDto, ClientUpdateDto } from '../dto';
import { ClientHistoryService } from 'src/client-history/client-history.service';

export async function createUpdateHistory(
  userId: number,
  clientId: number,
  client: ClientResponseDto,
  dto: ClientUpdateDto,
  clientHistoryService: ClientHistoryService,
) {
  const eventTypeMap: Record<keyof ClientUpdateDto, ClientHistoryEventType> = {
    name: ClientHistoryEventType.NAME_CHANGED,
    email: ClientHistoryEventType.EMAIL_CHANGED,
    phone: ClientHistoryEventType.PHONE_CHANGED,
    website: ClientHistoryEventType.WEBSITE_CHANGED,
    description: ClientHistoryEventType.DESCRIPTION_CHANGED,
  };

  const changedFields = Object.keys(dto).filter(
    (k) =>
      dto[k as keyof ClientUpdateDto] !== client[k as keyof ClientResponseDto],
  );

  for (const field of changedFields) {
    const clientField = field as keyof ClientUpdateDto;
    await clientHistoryService.create({
      clientId,
      actorId: userId,
      eventType: eventTypeMap[clientField],
      field: clientField,
      oldValue: (client[clientField] as Prisma.InputJsonValue) ?? null,
      newValue: (dto[clientField] as Prisma.InputJsonValue) ?? null,
    });
  }
}
