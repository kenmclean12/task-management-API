import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [AddressService],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
