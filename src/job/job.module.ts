import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobService } from './job.service';

@Module({
  imports: [PrismaModule],
  exports: [],
  controllers: [],
  providers: [JobService],
})
export class JobModule {}
