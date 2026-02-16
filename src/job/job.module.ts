import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
  imports: [PrismaModule],
  exports: [JobService],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
