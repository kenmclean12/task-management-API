import { User } from '@prisma/client';
import { UserResponseDto } from '../dto';

export function userToResponse(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt,
    role: user.role,
  };
}

export const userResponseSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatarUrl: true,
  createdAt: true,
  role: true,
} as const;
