import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientHistoryCreateDto, ClientHistoryResponseDto } from './dto';
import { UserService } from 'src/user/user.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class ClientHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
    private clientService: ClientService,
  ) {}

  async findOne(id: number): Promise<ClientHistoryResponseDto> {
    const record = await this.prisma.clientHistory.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `No client history record found with the provided id: ${id}`,
      );
    }

    return record;
  }

  async findByUserId(userId: number): Promise<ClientHistoryResponseDto[]> {
    return await this.prisma.clientHistory.findMany({
      where: { actorId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByClientId(clientId: number): Promise<ClientHistoryResponseDto[]> {
    return await this.prisma.clientHistory.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<ClientHistoryResponseDto[]> {
    return await this.prisma.clientHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: ClientHistoryCreateDto): Promise<ClientHistoryResponseDto> {
    await this.userService.findOne(dto.actorId);
    await this.clientService.findOne(dto.clientId);
    return await this.prisma.clientHistory.create({ data: dto });
  }
}
