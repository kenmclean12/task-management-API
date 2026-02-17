import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressModule } from 'src/address/address.module';
import { ClientHistoryModule } from 'src/client-history/client-history.module';

@Module({
  imports: [PrismaModule, AddressModule, forwardRef(() => ClientHistoryModule)],
  exports: [ClientService],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
