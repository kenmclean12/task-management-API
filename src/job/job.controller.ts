import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { JobCreateDto, JobResponseDto, JobUpdateDto } from './dto';
import { JobSwagger } from './utils';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get(':id')
  @JobSwagger.findOne()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<JobResponseDto> {
    return this.jobService.findOne(id);
  }

  @Get()
  @JobSwagger.findAll()
  findAll(): Promise<JobResponseDto[]> {
    return this.jobService.findAll();
  }

  @Get('/project/:id')
  @JobSwagger.findByProjectId()
  findByProjectId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobResponseDto[]> {
    return this.jobService.findByProjectId(id);
  }

  @Get('/user/:id')
  @JobSwagger.findByAssignedUserId()
  findByAssignedUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobResponseDto[]> {
    return this.jobService.findByAssignedUserId(id);
  }

  @Post()
  @JobSwagger.create()
  create(@Body() dto: JobCreateDto): Promise<JobResponseDto> {
    return this.jobService.create(dto);
  }

  @Patch(':id')
  @JobSwagger.update()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: JobUpdateDto,
  ): Promise<JobResponseDto> {
    return this.jobService.update(id, dto);
  }

  @Delete(':id')
  @JobSwagger.remove()
  remove(@Param('id', ParseIntPipe) id: number): Promise<JobResponseDto> {
    return this.jobService.remove(id);
  }
}
