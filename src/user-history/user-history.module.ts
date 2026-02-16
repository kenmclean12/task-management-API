import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserHistoryService } from './user-history.service';
import { UserHistoryController } from './user-history.controller';

@Module({
  imports: [PrismaModule, UserModule],
  exports: [UserHistoryService],
  controllers: [UserHistoryController],
  providers: [UserHistoryService],
})
export class UserHistoryModule {}
