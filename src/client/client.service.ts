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

@Injectable()
export class ClientService {
  constructor(
    private addressService: AddressService,
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

  async create(dto: ClientCreateDto): Promise<ClientResponseDto> {
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

    return created;
  }

  async createWithAddress(
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
    return created;
  }

  async update(id: number, dto: ClientUpdateDto): Promise<ClientResponseDto> {
    await this.findOne(id);
    const updated = await this.prisma.client.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Error, could not update client with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return updated;
  }

  async remove(id: number): Promise<ClientResponseDto> {
    const client = await this.findOne(id);
    await this.prisma.client.delete({ where: { id } });
    return client;
  }
}
