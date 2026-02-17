import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobHistoryModule } from 'src/job-history/job-history.module';

@Module({
  imports: [PrismaModule, JobHistoryModule],
  exports: [JobService],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
