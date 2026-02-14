import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
  PasswordResetDto,
} from './dto';
import { userResponseSelect, userToResponse } from './utils/userToResponse';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponseDto> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: userResponseSelect,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    return await this.prisma.user.findMany({ select: userResponseSelect });
  }

  async create(dto: UserCreateDto): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
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
    await this.prisma.user.findUniqueOrThrow({ where: { id } });
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
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

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
    const existingUser = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });

    await this.prisma.user.delete({ where: { id } });
    return userToResponse(existingUser);
  }
}
