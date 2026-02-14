import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddressCreateDto, AddressResponseDto, AddressUpdateDto } from './dto';
import { AddressSwagger } from './utils/swaggerDecorators';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @AddressSwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressResponseDto> {
    return await this.addressService.findOne(id);
  }

  @Get('client/:id')
  @AddressSwagger.findOneByClientId()
  async findOneByClientId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressResponseDto> {
    return await this.addressService.findOneByClientId(id);
  }

  @Get()
  @AddressSwagger.findAll()
  async findAll(): Promise<AddressResponseDto[]> {
    return await this.addressService.findAll();
  }

  @Post()
  @AddressSwagger.create()
  async create(@Body() dto: AddressCreateDto): Promise<AddressResponseDto> {
    return await this.addressService.create(dto);
  }

  @Patch(':id')
  @AddressSwagger.update()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddressUpdateDto,
  ): Promise<AddressResponseDto> {
    return await this.addressService.update(id, dto);
  }

  @Delete(':id')
  @AddressSwagger.remove()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AddressResponseDto> {
    return await this.addressService.remove(id);
  }
}
