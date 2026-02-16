import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ClientHistoryResponseDto } from '../dto';

export const ClientHistorySwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get a client history record by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ClientHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Client history record not found' }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all client history records' }),
      ApiOkResponse({ type: ClientHistoryResponseDto, isArray: true }),
    );
  },

  findByUserId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all client history records by user id' }),
      ApiParam({ name: 'userId', type: Number }),
      ApiOkResponse({ type: ClientHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No client history records found for this user',
      }),
    );
  },

  findByClientId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all client history records by client id' }),
      ApiParam({ name: 'clientId', type: Number }),
      ApiOkResponse({ type: ClientHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No client history records found for this client',
      }),
    );
  },
};
