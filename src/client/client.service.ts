import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ClientCreateDto,
  ClientCreateWithAddressDto,
  ClientResponseDto,
  ClientUpdateDto,
} from './dto';
import { AddressService } from 'src/address/address.service';
import { ClientHistoryService } from 'src/client-history/client-history.service';
import { Client, ClientHistoryEventType, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(
    private addressService: AddressService,
    private clientHistoryService: ClientHistoryService,
    private readonly prisma: PrismaService,
  ) {}

  async findOne(id: number): Promise<ClientResponseDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!client) {
      throw new NotFoundException(`No client found with provided id: ${id}`);
    }

    return client;
  }

  async findAll(): Promise<ClientResponseDto[]> {
    return await this.prisma.client.findMany();
  }

  async create(
    userId: number,
    dto: ClientCreateDto,
  ): Promise<ClientResponseDto> {
    const duplicateClientName = await this.prisma.client.findUnique({
      where: { name: dto.name },
    });

    if (duplicateClientName) {
      throw new ConflictException(
        `Error, client with name: ${dto.name} already exists`,
      );
    }

    const created = await this.prisma.client.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Error, could not create client with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await this.clientHistoryService.create({
      clientId: created.id,
      actorId: userId,
      eventType: ClientHistoryEventType.CREATED,
    });

    return created;
  }

  async createWithAddress(
    userId: number,
    dto: ClientCreateWithAddressDto,
  ): Promise<ClientResponseDto> {
    const { address, ...clientDto } = dto;
    const duplicateClientName = await this.prisma.client.findUnique({
      where: { name: clientDto.name },
    });

    if (duplicateClientName) {
      throw new ConflictException(
        `Error, client with name: ${clientDto.name} already exists`,
      );
    }

    const created = await this.prisma.client.create({ data: clientDto });
    if (!created) {
      throw new BadRequestException(
        `Error, could not create client with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await this.addressService.create({ ...address, clientId: created.id });
    await this.clientHistoryService.create({
      clientId: created.id,
      actorId: userId,
      eventType: ClientHistoryEventType.CREATED,
    });

    return created;
  }

  private async createUpdateHistory(
    userId: number,
    clientId: number,
    client: Client,
    dto: ClientUpdateDto,
  ) {
    const eventTypeMap: Record<keyof ClientUpdateDto, ClientHistoryEventType> =
      {
        name: ClientHistoryEventType.NAME_CHANGED,
        email: ClientHistoryEventType.EMAIL_CHANGED,
        phone: ClientHistoryEventType.PHONE_CHANGED,
        website: ClientHistoryEventType.WEBSITE_CHANGED,
        description: ClientHistoryEventType.DESCRIPTION_CHANGED,
      };

    const changedFields = Object.keys(dto).filter(
      (k) => dto[k as keyof ClientUpdateDto] !== client[k as keyof Client],
    );

    for (const field of changedFields) {
      const clientField = field as keyof ClientUpdateDto;
      await this.clientHistoryService.create({
        clientId,
        actorId: userId,
        eventType: eventTypeMap[clientField],
        field: clientField,
        oldValue: (client[clientField] as Prisma.InputJsonValue) ?? null,
        newValue: (dto[clientField] as Prisma.InputJsonValue) ?? null,
      });
    }
  }

  async update(
    id: number,
    userId: number,
    dto: ClientUpdateDto,
  ): Promise<ClientResponseDto> {
    const original = await this.findOne(id);
    const updated = await this.prisma.client.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Error, could not update client with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await this.createUpdateHistory(userId, id, original, dto);

    return updated;
  }

  async remove(id: number, userId: number): Promise<ClientResponseDto> {
    const client = await this.findOne(id);
    await this.prisma.client.delete({ where: { id } });

    await this.clientHistoryService.create({
      clientId: client.id,
      actorId: userId,
      eventType: ClientHistoryEventType.DELETED,
    });

    return client;
  }
}
