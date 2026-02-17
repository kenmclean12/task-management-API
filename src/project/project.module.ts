import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectHistoryModule } from 'src/project-history/project-history.module';

@Module({
  imports: [PrismaModule, ProjectHistoryModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
