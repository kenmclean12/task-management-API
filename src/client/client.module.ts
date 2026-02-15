import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [PrismaModule, AddressModule],
  exports: [ClientService],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
