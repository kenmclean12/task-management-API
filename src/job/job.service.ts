import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobCreateDto, JobResponseDto, JobUpdateDto } from './dto';
import { JobHistoryService } from 'src/job-history/job-history.service';
import { JobHistoryEventType } from '@prisma/client';
import { createUpdateHistory, jobToResponse } from './utils';

@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobHistoryService: JobHistoryService,
  ) {}

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

  async create(userId: number, dto: JobCreateDto): Promise<JobResponseDto> {
    const job = await this.prisma.job.create({
      data: dto,
      include: { assignedTo: true },
    });

    await this.jobHistoryService.create({
      jobId: job.id,
      actorId: userId,
      eventType: JobHistoryEventType.CREATED,
    });

    return jobToResponse(job);
  }

  async update(
    id: number,
    userId: number,
    dto: JobUpdateDto,
  ): Promise<JobResponseDto> {
    const original = await this.findOne(id);
    const updated = await this.prisma.job.update({
      where: { id },
      data: dto,
      include: { assignedTo: true },
    });

    await createUpdateHistory(
      userId,
      id,
      original,
      dto,
      this.jobHistoryService,
    );

    return jobToResponse(updated);
  }

  async remove(id: number, actorId: number): Promise<JobResponseDto> {
    const job = await this.findOne(id);
    await this.prisma.job.delete({ where: { id } });

    await this.jobHistoryService.create({
      jobId: id,
      actorId,
      eventType: JobHistoryEventType.DELETED,
    });

    return job;
  }
}
