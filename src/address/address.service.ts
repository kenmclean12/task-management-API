import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressCreateDto, AddressResponseDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<AddressResponseDto> {
    return await this.prisma.address.findUniqueOrThrow({ where: { id } });
  }

  async findAll(): Promise<AddressResponseDto[]> {
    return await this.prisma.address.findMany();
  }

  async create(dto: AddressCreateDto): Promise<AddressResponseDto> {
    const created = await this.prisma.address.create({ data: dto });
    if (!created) {
      throw new BadRequestException(
        `Error while creating address, bad request: ${JSON.stringify(dto)}`,
      );
    }

    return created;
  }
}
