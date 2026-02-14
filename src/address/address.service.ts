import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressCreateDto, AddressResponseDto, AddressUpdateDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException(`No adddress found with provided id: ${id}`);
    }

    return address;
  }

  async findOneByClientId(id: number): Promise<AddressResponseDto> {
    const address = await this.prisma.address.findUnique({
      where: { clientId: id },
    });

    if (!address) {
      throw new NotFoundException(
        `No address was found with the provided client id: ${id}`,
      );
    }

    return address;
  }

  async findAll(): Promise<AddressResponseDto[]> {
    return await this.prisma.address.findMany();
  }

  async create(dto: AddressCreateDto): Promise<AddressResponseDto> {
    const existingClient = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!existingClient) {
      throw new NotFoundException(
        `Error, no client found with provided id: ${dto.clientId}`,
      );
    }

    const created = await this.prisma.address.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Error while creating address, bad request: ${JSON.stringify(dto)}`,
      );
    }

    return created;
  }

  async update(id: number, dto: AddressUpdateDto): Promise<AddressResponseDto> {
    await this.findOne(id);
    const updated = await this.prisma.address.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Error, failed to updated address with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return updated;
  }

  async remove(id: number): Promise<AddressResponseDto> {
    const existing = await this.findOne(id);
    await this.prisma.address.delete({ where: { id } });
    return existing;
  }
}
