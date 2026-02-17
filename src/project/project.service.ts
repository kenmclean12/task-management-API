import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto, ProjectResponseDto, ProjectUpdateDto } from './dto';
import { createUpdateHistory, projectToResponse } from './utils';
import { ProjectHistoryService } from 'src/project-history/project-history.service';
import { ProjectHistoryEventType } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectHistoryService: ProjectHistoryService,
  ) {}

  async findOne(id: number): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!project) {
      throw new NotFoundException(
        `No project found with the provided id: ${id}`,
      );
    }

    return projectToResponse(project);
  }

  async findByClientId(id: number): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      where: { clientId: id },
      include: { assignedTo: true },
    });

    return projects.map(projectToResponse);
  }

  async findByAssignedUserId(id: number): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      where: { assignedTo: { some: { id } } },
      include: { assignedTo: true },
    });

    return projects.map(projectToResponse);
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      include: { assignedTo: true },
    });

    return projects.map(projectToResponse);
  }

  async create(
    userId: number,
    dto: ProjectCreateDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.create({
      data: dto,
      include: { assignedTo: true },
    });

    if (!project) {
      throw new BadRequestException(
        `Could not create project with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await this.projectHistoryService.create({
      projectId: project.id,
      actorId: userId,
      eventType: ProjectHistoryEventType.CREATED,
    });

    return projectToResponse(project);
  }

  async update(
    id: number,
    userId: number,
    dto: ProjectUpdateDto,
  ): Promise<ProjectResponseDto> {
    const original = await this.findOne(id);
    const updated = await this.prisma.project.update({
      where: { id },
      data: dto,
      include: { assignedTo: true },
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update project with provided data: ${JSON.stringify(dto)}`,
      );
    }

    await createUpdateHistory(
      userId,
      id,
      original,
      dto,
      this.projectHistoryService,
    );

    return projectToResponse(updated);
  }

  async remove(id: number, userId: number): Promise<ProjectResponseDto> {
    const project = await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });

    await this.projectHistoryService.create({
      projectId: id,
      actorId: userId,
      eventType: ProjectHistoryEventType.DELETED,
    });

    return project;
  }
}
