import { User } from '@prisma/client';
import { UserResponseDto } from '../dto';

export function userToResponse(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? undefined,
    createdAt: user.createdAt,
    role: user.role,
  };
}
