import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { JobModule } from './job/job.module';
import { JwtAuthGuard } from './auth/guards';
import { ClientHistoryModule } from './client-history/client-history.module';
import { ProjectHistoryModule } from './project-history/project-history.module';
import { JobHistoryModule } from './job-history/job-history.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ClientModule,
    AddressModule,
    AuthModule,
    ProjectModule,
    JobModule,
    ClientHistoryModule,
    ProjectHistoryModule,
    JobHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
