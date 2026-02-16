import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto, ProjectResponseDto, ProjectUpdateDto } from './dto';
import { projectToResponse } from './utils';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

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

    return projects.map((p) => projectToResponse(p));
  }

  async findByAssignedUserId(id: number): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      where: { assignedTo: { some: { id } } },
      include: { assignedTo: true },
    });

    return projects.map((p) => projectToResponse(p));
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.project.findMany({
      include: { assignedTo: true },
    });

    return projects.map((p) => projectToResponse(p));
  }

  async create(dto: ProjectCreateDto): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.create({
      data: dto,
      include: { assignedTo: true },
    });

    if (!project) {
      throw new BadRequestException(
        `Could not create project with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return projectToResponse(project);
  }

  async update(id: number, dto: ProjectUpdateDto) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`No project found with provided id: ${id}`);
    }

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

    return projectToResponse(updated);
  }

  async remove(id: number): Promise<ProjectResponseDto> {
    const existing = await this.prisma.project.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!existing) {
      throw new NotFoundException(
        `No project found with the provided id: ${id}`,
      );
    }

    await this.prisma.project.delete({ where: { id } });
    return projectToResponse(existing);
  }
}
