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
import { ClientService } from './client.service';
import { ClientCreateDto, ClientResponseDto, ClientUpdateDto } from './dto';
import { ClientSwagger } from './utils';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':id')
  @ClientSwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientResponseDto> {
    return await this.clientService.findOne(id);
  }

  @Get()
  @ClientSwagger.findAll()
  async findAll(): Promise<ClientResponseDto[]> {
    return await this.clientService.findAll();
  }

  @Post()
  @ClientSwagger.create()
  async create(@Body() dto: ClientCreateDto): Promise<ClientResponseDto> {
    return await this.clientService.create(dto);
  }

  @Patch(':id')
  @ClientSwagger.update()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ClientUpdateDto,
  ): Promise<ClientResponseDto> {
    return await this.clientService.update(id, dto);
  }

  @Delete(':id')
  @ClientSwagger.remove()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientResponseDto> {
    return await this.clientService.remove(id);
  }
}
