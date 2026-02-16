import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
