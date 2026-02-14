import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  PasswordResetDto,
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
} from '../dto';

export const UserSwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get a user by ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: UserResponseDto }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all users' }),
      ApiOkResponse({ type: [UserResponseDto] }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new user' }),
      ApiBody({ type: UserCreateDto }),
      ApiOkResponse({ type: UserResponseDto }),
    );
  },

  update: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Update user information by user ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiBody({ type: UserUpdateDto }),
      ApiOkResponse({ type: UserResponseDto }),
    );
  },

  changePassword: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Change user password' }),
      ApiBody({ type: PasswordResetDto }),
      ApiOkResponse({ type: UserResponseDto }),
    );
  },

  remove: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Delete a user by ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: UserResponseDto }),
    );
  },
};
