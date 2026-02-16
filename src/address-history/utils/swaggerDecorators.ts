import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AddressHistoryResponseDto } from '../dto';

export const AddressHistorySwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get an address history record by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: AddressHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Address history record not found' }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all address history records' }),
      ApiOkResponse({ type: AddressHistoryResponseDto, isArray: true }),
    );
  },

  findByUserId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get address history by user id' }),
      ApiParam({ name: 'userId', type: Number }),
      ApiOkResponse({ type: AddressHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No address history found for this user',
      }),
    );
  },

  findByAddressId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get address history by address id' }),
      ApiParam({ name: 'addressId', type: Number }),
      ApiOkResponse({ type: AddressHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No address history found for this address',
      }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create an address history record' }),
      ApiCreatedResponse({ type: AddressHistoryResponseDto }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    );
  },
};
