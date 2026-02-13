/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
  PasswordResetDto,
} from './dto';
import { userToResponse } from './utils/userToResponse';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`No user found with ID: ${id}`);
    return userToResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => userToResponse(u));
  }

  async create(dto: UserCreateDto): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser)
      throw new ConflictException(
        `User with email ${dto.email} already exists`,
      );

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
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser)
      throw new NotFoundException(`No user found with ID: ${id}`);

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    if (!updated)
      throw new BadRequestException(
        `Could not update user ID: ${id} with data: ${JSON.stringify(dto)}`,
      );

    return userToResponse(updated);
  }

  async changePassword(
    userId: number,
    dto: PasswordResetDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`No user found with ID: ${userId}`);

    const passwordMatches = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Old password does not match');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return userToResponse(updated);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`no user found, requested id: ${id}`);
    }

    await this.prisma.user.delete({ where: { id } });
    return userToResponse(existingUser);
  }
}
