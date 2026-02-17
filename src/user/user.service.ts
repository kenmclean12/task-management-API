import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  PasswordResetDto,
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
} from './dto';
import { User, UserHistoryEventType } from '@prisma/client';
import {
  createUpdateHistory,
  userResponseSelect,
  userToResponse,
} from './utils';
import { UserHistoryService } from 'src/user-history/user-history.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userHistoryService: UserHistoryService,
  ) {}

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userResponseSelect,
    });

    if (!user) {
      throw new NotFoundException(`No user found with provided id: ${id}`);
    }

    return user;
  }

  async findOneSensitiveFieldsIncluded(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`No user found with provided id: ${id}`);
    }

    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.user.findMany({ select: userResponseSelect });
  }

  async create(actorId: number, dto: UserCreateDto): Promise<UserResponseDto> {
    const duplicateEmailUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (duplicateEmailUser) {
      throw new ConflictException(
        `User with email ${dto.email} already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const created = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    if (!created)
      throw new BadRequestException(
        `Could not create user with data: ${JSON.stringify(dto)}`,
      );

    await this.userHistoryService.create({
      userId: created.id,
      actorId,
      eventType: UserHistoryEventType.CREATED,
    });

    return userToResponse(created);
  }

  async update(
    id: number,
    actorId: number,
    dto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    const original = await this.findOne(id);
    if (dto.email) {
      const duplicateEmailUser = await this.prisma.user.findFirst({
        where: { email: dto.email, id: { not: id } },
      });

      if (duplicateEmailUser) {
        throw new ConflictException(
          `User with email ${duplicateEmailUser.email} already exists`,
        );
      }
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update user with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await createUpdateHistory(
      actorId,
      id,
      original,
      dto,
      this.userHistoryService,
    );

    return userToResponse(updated);
  }

  async changePassword(
    userId: number,
    actorId: number,
    dto: PasswordResetDto,
  ): Promise<UserResponseDto> {
    const user = await this.findOneSensitiveFieldsIncluded(userId);
    const passwordMatches = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Old password does not match');
    }

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    await this.userHistoryService.create({
      userId,
      actorId,
      eventType: UserHistoryEventType.PASSWORD_CHANGED,
    });

    return userToResponse(updated);
  }

  async remove(id: number, actorId: number): Promise<UserResponseDto> {
    const existingUser = await this.findOneSensitiveFieldsIncluded(id);
    await this.prisma.user.delete({ where: { id } });

    await this.userHistoryService.create({
      userId: id,
      actorId,
      eventType: UserHistoryEventType.DELETED,
    });

    return userToResponse(existingUser);
  }
}
