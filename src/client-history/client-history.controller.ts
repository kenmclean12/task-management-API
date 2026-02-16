import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientHistoryService } from './client-history.service';
import { ClientHistoryResponseDto } from './dto';
import { ClientHistorySwagger } from './utils';

@ApiTags('ClientHistory')
@Controller('client-history')
export class ClientHistoryController {
  constructor(private readonly clientHistoryService: ClientHistoryService) {}

  @Get(':id')
  @ClientHistorySwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientHistoryResponseDto> {
    return await this.clientHistoryService.findOne(id);
  }

  @Get()
  @ClientHistorySwagger.findAll()
  async findAll(): Promise<ClientHistoryResponseDto[]> {
    return await this.clientHistoryService.findAll();
  }

  @Get('user/:userId')
  @ClientHistorySwagger.findByUserId()
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ClientHistoryResponseDto[]> {
    return await this.clientHistoryService.findByUserId(userId);
  }

  @Get('client/:clientId')
  @ClientHistorySwagger.findByClientId()
  async findByClientId(
    @Param('clientId', ParseIntPipe) clientId: number,
  ): Promise<ClientHistoryResponseDto[]> {
    return await this.clientHistoryService.findByClientId(clientId);
  }
}
