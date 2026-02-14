import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    await this.addressService.findOne(id);
  }
}
