import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
  PasswordResetDto,
} from './dto';
import { User } from '@prisma/client';
import { userResponseSelect, userToResponse } from './utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

  async create(dto: UserCreateDto): Promise<UserResponseDto> {
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

    return userToResponse(created);
  }

  async update(id: number, dto: UserUpdateDto): Promise<UserResponseDto> {
    await this.findOne(id);
    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    return userToResponse(updated);
  }

  async changePassword(
    userId: number,
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

    return userToResponse(updated);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const existingUser = await this.findOneSensitiveFieldsIncluded(id);
    await this.prisma.user.delete({ where: { id } });
    return userToResponse(existingUser);
  }
}
