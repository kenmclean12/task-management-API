import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserHistoryResponseDto } from '../dto';

export const UserHistorySwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get a user history record by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: UserHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'User history record not found' }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all user history records' }),
      ApiOkResponse({ type: UserHistoryResponseDto, isArray: true }),
    );
  },

  findByUserId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all history records for a specific user' }),
      ApiParam({ name: 'userId', type: Number }),
      ApiOkResponse({ type: UserHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No user history records found for this user',
      }),
    );
  },

  findByActorId: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Get all history records performed by a specific actor',
      }),
      ApiParam({ name: 'actorId', type: Number }),
      ApiOkResponse({ type: UserHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No user history records found for this actor',
      }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new user history record' }),
      ApiCreatedResponse({ type: UserHistoryResponseDto }),
      ApiBadRequestResponse({ description: 'Invalid request' }),
    );
  },
};
