import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressHistoryCreateDto, AddressHistoryResponseDto } from './dto';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class AddressHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
    @Inject(forwardRef(() => AddressService))
    private addressService: AddressService,
  ) {}

  async findOne(id: number): Promise<AddressHistoryResponseDto> {
    const record = await this.prisma.addressHistory.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `No address history record found with id: ${id}`,
      );
    }

    return record;
  }

  async findByUserId(userId: number): Promise<AddressHistoryResponseDto[]> {
    return await this.prisma.addressHistory.findMany({
      where: { actorId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByAddressId(
    addressId: number,
  ): Promise<AddressHistoryResponseDto[]> {
    return await this.prisma.addressHistory.findMany({
      where: { addressId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<AddressHistoryResponseDto[]> {
    return await this.prisma.addressHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    dto: AddressHistoryCreateDto,
  ): Promise<AddressHistoryResponseDto> {
    await this.userService.findOne(dto.actorId);
    await this.addressService.findOne(dto.addressId);
    return await this.prisma.addressHistory.create({ data: dto });
  }
}
