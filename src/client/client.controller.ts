import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import {
  ClientCreateDto,
  ClientCreateWithAddressDto,
  ClientResponseDto,
  ClientUpdateDto,
} from './dto';
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
  async create(
    @Req() req,
    @Body() dto: ClientCreateDto,
  ): Promise<ClientResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.clientService.create(userId, dto);
  }

  @Post('with-address')
  @ClientSwagger.create()
  async createWithAddress(
    @Req() req,
    @Body() dto: ClientCreateWithAddressDto,
  ): Promise<ClientResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.clientService.createWithAddress(userId, dto);
  }

  @Patch(':id')
  @ClientSwagger.update()
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ClientUpdateDto,
  ): Promise<ClientResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.clientService.update(id, userId, dto);
  }

  @Delete(':id')
  @ClientSwagger.remove()
  async remove(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.clientService.remove(id, userId);
  }
}
