import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ProjectHistoryResponseDto } from '../dto';

export const ProjectHistorySwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get a project history record by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: ProjectHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Project history record not found' }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all project history records' }),
      ApiOkResponse({ type: ProjectHistoryResponseDto, isArray: true }),
    );
  },

  findByUserId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all project history records by user id' }),
      ApiParam({ name: 'userId', type: Number }),
      ApiOkResponse({ type: ProjectHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No project history records found for this user',
      }),
    );
  },

  findByProjectId: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'Get all project history records by project id',
      }),
      ApiParam({ name: 'projectId', type: Number }),
      ApiOkResponse({ type: ProjectHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No project history records found for this project',
      }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new project history record' }),
      ApiCreatedResponse({ type: ProjectHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Project or user not found' }),
    );
  },
};
