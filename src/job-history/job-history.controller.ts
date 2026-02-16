import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobHistoryService } from './job-history.service';
import { JobHistoryResponseDto, JobHistoryCreateDto } from './dto';
import { JobHistorySwagger } from './utils';

@ApiTags('JobHistory')
@Controller('job-history')
export class JobHistoryController {
  constructor(private readonly jobHistoryService: JobHistoryService) {}

  @Get(':id')
  @JobHistorySwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobHistoryResponseDto> {
    return await this.jobHistoryService.findOne(id);
  }

  @Get()
  @JobHistorySwagger.findAll()
  async findAll(): Promise<JobHistoryResponseDto[]> {
    return await this.jobHistoryService.findAll();
  }

  @Get('user/:userId')
  @JobHistorySwagger.findByUserId()
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<JobHistoryResponseDto[]> {
    return await this.jobHistoryService.findByUserId(userId);
  }

  @Get('job/:jobId')
  @JobHistorySwagger.findByJobId()
  async findByJobId(
    @Param('jobId', ParseIntPipe) jobId: number,
  ): Promise<JobHistoryResponseDto[]> {
    return await this.jobHistoryService.findByJobId(jobId);
  }

  @Post()
  @JobHistorySwagger.create()
  async create(
    @Body() dto: JobHistoryCreateDto,
  ): Promise<JobHistoryResponseDto> {
    return await this.jobHistoryService.create(dto);
  }
}
