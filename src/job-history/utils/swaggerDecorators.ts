import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JobHistoryResponseDto } from '../dto';

export const JobHistorySwagger = {
  findOne: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get a job history record by id' }),
      ApiParam({ name: 'id', type: Number }),
      ApiOkResponse({ type: JobHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Job history record not found' }),
    );
  },

  findAll: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all job history records' }),
      ApiOkResponse({ type: JobHistoryResponseDto, isArray: true }),
    );
  },

  findByUserId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all job history records by user id' }),
      ApiParam({ name: 'userId', type: Number }),
      ApiOkResponse({ type: JobHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({
        description: 'No job history found for this user',
      }),
    );
  },

  findByJobId: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Get all job history records by job id' }),
      ApiParam({ name: 'jobId', type: Number }),
      ApiOkResponse({ type: JobHistoryResponseDto, isArray: true }),
      ApiNotFoundResponse({ description: 'No job history found for this job' }),
    );
  },

  create: () => {
    return applyDecorators(
      ApiOperation({ summary: 'Create a new job history record' }),
      ApiCreatedResponse({ type: JobHistoryResponseDto }),
      ApiNotFoundResponse({ description: 'Job or user not found' }),
    );
  },
};
