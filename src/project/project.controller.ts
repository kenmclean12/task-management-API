import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { ProjectCreateDto, ProjectResponseDto, ProjectUpdateDto } from './dto';
import { ProjectSwagger } from './utils';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  @ProjectSwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto> {
    return await this.projectService.findOne(id);
  }

  @Get()
  @ProjectSwagger.findAll()
  async findAll(): Promise<ProjectResponseDto[]> {
    return await this.projectService.findAll();
  }

  @Get('/client/:id')
  @ProjectSwagger.findByClientId()
  async findByClientId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto[]> {
    return await this.projectService.findByClientId(id);
  }

  @Get('/user/:id')
  @ProjectSwagger.findByAssignedUserId()
  async findByAssignedUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto[]> {
    return await this.projectService.findByAssignedUserId(id);
  }

  @Post()
  @ProjectSwagger.create()
  async create(
    @Req() req,
    @Body() dto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.projectService.create(userId, dto);
  }

  @Patch(':id')
  @ProjectSwagger.update()
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProjectUpdateDto,
  ): Promise<ProjectResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.projectService.update(id, userId, dto);
  }

  @Delete(':id')
  @ProjectSwagger.remove()
  async remove(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.projectService.remove(id, userId);
  }
}
