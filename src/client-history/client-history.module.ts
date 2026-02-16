import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ClientHistoryService } from './client-history.service';

@Module({
  imports: [PrismaModule, UserModule, ClientModule],
  exports: [ClientHistoryService],
  controllers: [],
  providers: [ClientHistoryService],
})
export class ClientHistoryModule {}
