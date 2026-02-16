import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectHistoryService } from './project-history.service';
import { ProjectHistoryResponseDto, ProjectHistoryCreateDto } from './dto';
import { ProjectHistorySwagger } from './utils';

@ApiTags('ProjectHistory')
@Controller('project-history')
export class ProjectHistoryController {
  constructor(private readonly projectHistoryService: ProjectHistoryService) {}

  @Get(':id')
  @ProjectHistorySwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectHistoryResponseDto> {
    return await this.projectHistoryService.findOne(id);
  }

  @Get()
  @ProjectHistorySwagger.findAll()
  async findAll(): Promise<ProjectHistoryResponseDto[]> {
    return await this.projectHistoryService.findAll();
  }

  @Get('user/:userId')
  @ProjectHistorySwagger.findByUserId()
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ProjectHistoryResponseDto[]> {
    return await this.projectHistoryService.findByUserId(userId);
  }

  @Get('project/:projectId')
  @ProjectHistorySwagger.findByProjectId()
  async findByProjectId(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectHistoryResponseDto[]> {
    return await this.projectHistoryService.findByProjectId(projectId);
  }

  @Post()
  @ProjectHistorySwagger.create()
  async create(
    @Body() dto: ProjectHistoryCreateDto,
  ): Promise<ProjectHistoryResponseDto> {
    return await this.projectHistoryService.create(dto);
  }
}
