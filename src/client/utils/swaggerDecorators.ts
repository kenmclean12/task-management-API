import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { ClientResponseDto } from '../dto';

export const ClientSwagger = {
  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a client by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ClientResponseDto }),
      ApiNotFoundResponse({ description: 'Client not found' }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all clients' }),
      ApiOkResponse({ type: ClientResponseDto, isArray: true }),
    ),

  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a client' }),
      ApiCreatedResponse({ type: ClientResponseDto }),
      ApiConflictResponse({ description: 'Client name already exists' }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update a client' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ClientResponseDto }),
      ApiNotFoundResponse({ description: 'Client not found' }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete a client' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ClientResponseDto }),
      ApiNotFoundResponse({ description: 'Client not found' }),
    ),
};
