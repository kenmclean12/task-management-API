import { Module } from '@nestjs/common';
import { JobModule } from 'src/job/job.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JobHistoryService } from './job-history.service';
import { JobHistoryController } from './job-history.controller';

@Module({
  imports: [PrismaModule, UserModule, JobModule],
  exports: [JobHistoryService],
  controllers: [JobHistoryController],
  providers: [JobHistoryService],
})
export class JobHistoryModule {}
