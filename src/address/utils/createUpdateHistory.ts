import { AddressField, AddressHistoryEventType, Prisma } from '@prisma/client';
import { AddressResponseDto, AddressUpdateDto } from '../dto';
import { AddressHistoryService } from 'src/address-history/address-history.service';

export async function createUpdateHistory(
  userId: number,
  addressId: number,
  address: AddressResponseDto,
  dto: AddressUpdateDto,
  historyService: AddressHistoryService,
) {
  const eventTypeMap: Record<keyof AddressUpdateDto, AddressHistoryEventType> =
    {
      street: AddressHistoryEventType.STREET_CHANGED,
      city: AddressHistoryEventType.CITY_CHANGED,
      state: AddressHistoryEventType.STATE_CHANGED,
      country: AddressHistoryEventType.COUNTRY_CHANGED,
      postalCode: AddressHistoryEventType.POSTALCODE_CHANGED,
      clientId: AddressHistoryEventType.CLIENT_CHANGED,
    };

  const changedFields = Object.keys(dto).filter(
    (k) =>
      dto[k as keyof AddressUpdateDto] !==
      address[k as keyof AddressResponseDto],
  );

  for (const field of changedFields) {
    const key = field as keyof AddressUpdateDto;
    await historyService.create({
      addressId,
      actorId: userId,
      eventType: eventTypeMap[key],
      field: key as AddressField,
      oldValue: (address[key] as Prisma.InputJsonValue) ?? null,
      newValue: (dto[key] as Prisma.InputJsonValue) ?? null,
    });
  }
}
