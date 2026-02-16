import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobCreateDto, JobResponseDto, JobUpdateDto } from './dto';
import { jobToResponse } from './utils';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<JobResponseDto> {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!job) throw new NotFoundException(`No job found with id: ${id}`);
    return jobToResponse(job);
  }

  async findByProjectId(projectId: number): Promise<JobResponseDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: { projectId },
      include: { assignedTo: true },
    });

    return jobs.map(jobToResponse);
  }

  async findByAssignedUserId(userId: number): Promise<JobResponseDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: { assignedTo: { some: { id: userId } } },
      include: { assignedTo: true },
    });

    return jobs.map(jobToResponse);
  }

  async findAll(): Promise<JobResponseDto[]> {
    const jobs = await this.prisma.job.findMany({
      include: { assignedTo: true },
    });

    return jobs.map(jobToResponse);
  }

  async create(dto: JobCreateDto): Promise<JobResponseDto> {
    const job = await this.prisma.job.create({
      data: dto,
      include: { assignedTo: true },
    });

    if (!job) {
      throw new BadRequestException(
        `Could not create job with provided data: ${JSON.stringify(dto)}`,
      );
    }
    return jobToResponse(job);
  }

  async update(id: number, dto: JobUpdateDto): Promise<JobResponseDto> {
    const existing = await this.prisma.job.findUnique({ where: { id } });
    if (!existing)
      throw new NotFoundException(`No job found with provided id: ${id}`);

    const updated = await this.prisma.job.update({
      where: { id },
      data: dto,
      include: { assignedTo: true },
    });

    if (!updated) {
      throw new BadRequestException(
        `Could not update job with provided data: ${JSON.stringify(dto)}`,
      );
    }

    return jobToResponse(updated);
  }

  async remove(id: number): Promise<JobResponseDto> {
    const existing = await this.prisma.job.findUnique({
      where: { id },
      include: { assignedTo: true },
    });

    if (!existing) throw new NotFoundException(`No job found with id: ${id}`);

    await this.prisma.job.delete({ where: { id } });
    return jobToResponse(existing);
  }
}
