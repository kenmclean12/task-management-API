import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressHistoryModule } from 'src/address-history/address-history.module';

@Module({
  imports: [PrismaModule, AddressHistoryModule],
  exports: [AddressService],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
