import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobHistoryCreateDto, JobHistoryResponseDto } from './dto';
import { UserService } from 'src/user/user.service';
import { JobService } from 'src/job/job.service';

@Injectable()
export class JobHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
  ) {}

  async findOne(id: number): Promise<JobHistoryResponseDto> {
    const record = await this.prisma.jobHistory.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`No job history found with id ${id}`);
    }

    return record;
  }

  async findByUserId(userId: number): Promise<JobHistoryResponseDto[]> {
    return await this.prisma.jobHistory.findMany({
      where: { actorId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByJobId(jobId: number): Promise<JobHistoryResponseDto[]> {
    return await this.prisma.jobHistory.findMany({
      where: { jobId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<JobHistoryResponseDto[]> {
    return await this.prisma.jobHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: JobHistoryCreateDto): Promise<JobHistoryResponseDto> {
    await this.userService.findOne(dto.actorId);
    await this.jobService.findOne(dto.jobId);
    return await this.prisma.jobHistory.create({ data: dto });
  }
}
