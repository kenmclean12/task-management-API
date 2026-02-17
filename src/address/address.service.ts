import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressCreateDto, AddressResponseDto, AddressUpdateDto } from './dto';
import { AddressHistoryService } from 'src/address-history/address-history.service';
import { AddressHistoryEventType } from '@prisma/client';
import { createUpdateHistory } from './utils';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly addressHistoryService: AddressHistoryService,
  ) {}

  async findOne(id: number): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException(`No address found with id: ${id}`);
    }

    return address;
  }

  async findOneByClientId(id: number): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({
      where: { clientId: id },
    });

    if (!address) {
      throw new NotFoundException(`No address found for clientId: ${id}`);
    }

    return address;
  }

  async findAll(): Promise<AddressResponseDto[]> {
    return this.prisma.address.findMany();
  }

  async create(
    userId: number,
    dto: AddressCreateDto,
  ): Promise<AddressResponseDto> {
    const existingClient = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!existingClient) {
      throw new NotFoundException(`No client with id: ${dto.clientId}`);
    }

    const created = await this.prisma.address.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Could not create address with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await this.addressHistoryService.create({
      addressId: created.id,
      actorId: userId,
      eventType: AddressHistoryEventType.CREATED,
    });

    return created;
  }

  async update(
    id: number,
    userId: number,
    dto: AddressUpdateDto,
  ): Promise<AddressResponseDto> {
    const original = await this.findOne(id);
    const updated = await this.prisma.address.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update address with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await createUpdateHistory(
      userId,
      id,
      original,
      dto,
      this.addressHistoryService,
    );

    return updated;
  }

  async remove(id: number, userId: number): Promise<AddressResponseDto> {
    const address = await this.findOne(id);
    await this.prisma.address.delete({ where: { id } });

    await this.addressHistoryService.create({
      addressId: id,
      actorId: userId,
      eventType: AddressHistoryEventType.DELETED,
    });

    return address;
  }
}
