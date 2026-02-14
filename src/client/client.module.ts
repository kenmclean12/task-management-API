import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [ClientService],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
