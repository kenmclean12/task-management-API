import { forwardRef, Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ClientHistoryService } from './client-history.service';
import { ClientHistoryController } from './client-history.controller';

@Module({
  imports: [PrismaModule, UserModule, forwardRef(() => ClientModule)],
  exports: [ClientHistoryService],
  controllers: [ClientHistoryController],
  providers: [ClientHistoryService],
})
export class ClientHistoryModule {}
