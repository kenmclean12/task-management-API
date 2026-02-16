import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressHistoryService } from './address-history.service';
import { AddressHistoryResponseDto, AddressHistoryCreateDto } from './dto';
import { AddressHistorySwagger } from './utils';

@ApiTags('AddressHistory')
@Controller('address-history')
export class AddressHistoryController {
  constructor(private readonly addressHistoryService: AddressHistoryService) {}

  @Get(':id')
  @AddressHistorySwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressHistoryResponseDto> {
    return await this.addressHistoryService.findOne(id);
  }

  @Get()
  @AddressHistorySwagger.findAll()
  async findAll(): Promise<AddressHistoryResponseDto[]> {
    return await this.addressHistoryService.findAll();
  }

  @Get('user/:userId')
  @AddressHistorySwagger.findByUserId()
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<AddressHistoryResponseDto[]> {
    return await this.addressHistoryService.findByUserId(userId);
  }

  @Get('address/:addressId')
  @AddressHistorySwagger.findByAddressId()
  async findByAddressId(
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<AddressHistoryResponseDto[]> {
    return await this.addressHistoryService.findByAddressId(addressId);
  }

  @Post()
  @AddressHistorySwagger.create()
  async create(
    @Body() dto: AddressHistoryCreateDto,
  ): Promise<AddressHistoryResponseDto> {
    return await this.addressHistoryService.create(dto);
  }
}
