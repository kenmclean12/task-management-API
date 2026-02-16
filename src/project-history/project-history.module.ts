import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ProjectHistoryService } from './project-history.service';
import { ProjectHistoryController } from './project-history.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [PrismaModule, UserModule, ProjectModule],
  exports: [ProjectHistoryService],
  controllers: [ProjectHistoryController],
  providers: [ProjectHistoryService],
})
export class ProjectHistoryModule {}
