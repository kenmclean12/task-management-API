import { forwardRef, Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AddressHistoryService } from './address-history.service';
import { AddressHistoryController } from './address-history.controller';

@Module({
  imports: [PrismaModule, UserModule, forwardRef(() => AddressModule)],
  exports: [AddressHistoryService],
  controllers: [AddressHistoryController],
  providers: [AddressHistoryService],
})
export class AddressHistoryModule {}
