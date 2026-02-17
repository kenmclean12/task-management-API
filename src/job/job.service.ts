import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobCreateDto, JobResponseDto, JobUpdateDto } from './dto';
import { JobHistoryService } from 'src/job-history/job-history.service';
import { JobHistoryEventType, JobField, Prisma } from '@prisma/client';
import { jobToResponse } from './utils';

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

  private async createUpdateHistory(
    actorId: number,
    jobId: number,
    job: JobResponseDto,
    dto: JobUpdateDto,
  ) {
    const eventTypeMap: Record<keyof JobUpdateDto, JobHistoryEventType> = {
      title: JobHistoryEventType.TITLE_CHANGED,
      description: JobHistoryEventType.DESCRIPTION_CHANGED,
      status: JobHistoryEventType.STATUS_CHANGED,
      priority: JobHistoryEventType.PRIORITY_CHANGED,
      startDate: JobHistoryEventType.START_DATE_CHANGED,
      dueDate: JobHistoryEventType.DUE_DATE_CHANGED,
      finishDate: JobHistoryEventType.FINISH_DATE_CHANGED,
      assignedToUserIds: JobHistoryEventType.ASSIGNED_USERS_CHANGED,
    };

    const changedFields = Object.keys(dto).filter((k) => {
      const key = k as keyof JobUpdateDto;
      if (key === 'assignedToUserIds') {
        const oldIds = job.assignedTo?.map((u) => u.id).sort() ?? [];
        const newIds = dto.assignedToUserIds?.sort() ?? [];
        return JSON.stringify(oldIds) !== JSON.stringify(newIds);
      }

      return dto[k as keyof JobUpdateDto] !== job[k as keyof JobUpdateDto];
    });

    for (const field of changedFields) {
      const key = field as keyof JobUpdateDto;
      let oldValue: Prisma.InputJsonValue | null;
      let newValue: Prisma.InputJsonValue | null;

      if (key === 'assignedToUserIds') {
        oldValue = job.assignedTo?.map((u) => u.id).sort() ?? [];
        newValue = dto.assignedToUserIds ?? [];
      } else {
        oldValue = (job[key] as Prisma.InputJsonValue) ?? null;
        newValue = (dto[key] as Prisma.InputJsonValue) ?? null;
      }

      await this.jobHistoryService.create({
        jobId,
        actorId,
        eventType: eventTypeMap[key],
        field: key as JobField,
        oldValue,
        newValue,
      });
    }
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

    await this.createUpdateHistory(userId, id, original, dto);
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
