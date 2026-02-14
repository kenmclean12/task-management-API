import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AddressCreateDto, AddressResponseDto, AddressUpdateDto } from '../dto';

export const AddressSwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get an address by ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: AddressResponseDto }),
    );
  },

  findOneByClientId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get an address by client ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: AddressResponseDto }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all addresses' }),
      ApiOkResponse({ type: [AddressResponseDto] }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new address' }),
      ApiBody({ type: AddressCreateDto }),
      ApiOkResponse({ type: AddressResponseDto }),
    );
  },

  update: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Update an address by ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiBody({ type: AddressUpdateDto }),
      ApiOkResponse({ type: AddressResponseDto }),
    );
  },

  remove: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Delete an address by ID' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: AddressResponseDto }),
    );
  },
};
