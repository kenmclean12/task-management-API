import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHistoryCreateDto, UserHistoryResponseDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
  ) {}

  async findOne(id: number): Promise<UserHistoryResponseDto> {
    const record = await this.prisma.userHistory.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `No user history record found with id: ${id}`,
      );
    }

    return record;
  }

  async findByUserId(userId: number): Promise<UserHistoryResponseDto[]> {
    return await this.prisma.userHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByActorId(actorId: number): Promise<UserHistoryResponseDto[]> {
    return await this.prisma.userHistory.findMany({
      where: { actorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<UserHistoryResponseDto[]> {
    return await this.prisma.userHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: UserHistoryCreateDto): Promise<UserHistoryResponseDto> {
    await this.userService.findOne(dto.actorId);
    await this.userService.findOne(dto.userId);
    return await this.prisma.userHistory.create({ data: dto });
  }
}
