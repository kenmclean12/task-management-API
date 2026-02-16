import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JobResponseDto } from '../dto';

export const JobSwagger = {
  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a job by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobResponseDto }),
      ApiNotFoundResponse({ description: 'Job not found' }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all jobs' }),
      ApiOkResponse({ type: JobResponseDto, isArray: true }),
    ),

  findByProjectId: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all jobs for a specific project' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobResponseDto, isArray: true }),
    ),

  findByAssignedUserId: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all jobs assigned to a specific user' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobResponseDto, isArray: true }),
    ),

  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a job' }),
      ApiCreatedResponse({ type: JobResponseDto }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update a job' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobResponseDto }),
      ApiNotFoundResponse({ description: 'Job not found' }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete a job' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobResponseDto }),
      ApiNotFoundResponse({ description: 'Job not found' }),
    ),
};
