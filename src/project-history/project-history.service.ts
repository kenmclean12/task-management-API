import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectHistoryCreateDto, ProjectHistoryResponseDto } from './dto';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProjectHistoryService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

  async findOne(id: number): Promise<ProjectHistoryResponseDto> {
    const record = await this.prisma.projectHistory.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `No project history record found with the provided id: ${id}`,
      );
    }

    return record;
  }

  async findByUserId(userId: number): Promise<ProjectHistoryResponseDto[]> {
    return await this.prisma.projectHistory.findMany({
      where: { actorId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByProjectId(
    projectId: number,
  ): Promise<ProjectHistoryResponseDto[]> {
    return await this.prisma.projectHistory.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(): Promise<ProjectHistoryResponseDto[]> {
    return await this.prisma.projectHistory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    dto: ProjectHistoryCreateDto,
  ): Promise<ProjectHistoryResponseDto> {
    await this.userService.findOne(dto.actorId);
    await this.projectService.findOne(dto.projectId);
    return await this.prisma.projectHistory.create({ data: dto });
  }
}
