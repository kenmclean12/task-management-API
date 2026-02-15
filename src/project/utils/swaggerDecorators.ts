import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ProjectResponseDto } from '../dto';

export const ProjectSwagger = {
  findOne: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a project by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectResponseDto }),
      ApiNotFoundResponse({ description: 'Project not found' }),
    ),

  findAll: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all projects' }),
      ApiOkResponse({ type: ProjectResponseDto, isArray: true }),
    ),

  findByClientId: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all projects for a specific client' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectResponseDto, isArray: true }),
    ),

  findByAssignedUserId: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all projects assigned to a specific user' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectResponseDto, isArray: true }),
    ),

  create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a project' }),
      ApiCreatedResponse({ type: ProjectResponseDto }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update a project' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectResponseDto }),
      ApiNotFoundResponse({ description: 'Project not found' }),
      ApiBadRequestResponse({ description: 'Bad request' }),
    ),

  remove: () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete a project' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectResponseDto }),
      ApiNotFoundResponse({ description: 'Project not found' }),
    ),
};
