import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserHistoryService } from './user-history.service';
import { UserHistoryResponseDto, UserHistoryCreateDto } from './dto';
import { UserHistorySwagger } from './utils';

@ApiTags('UserHistory')
@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Get(':id')
  @UserHistorySwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserHistoryResponseDto> {
    return await this.userHistoryService.findOne(id);
  }

  @Get()
  @UserHistorySwagger.findAll()
  async findAll(): Promise<UserHistoryResponseDto[]> {
    return await this.userHistoryService.findAll();
  }

  @Get('user/:userId')
  @UserHistorySwagger.findByUserId()
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserHistoryResponseDto[]> {
    return await this.userHistoryService.findByUserId(userId);
  }

  @Get('actor/:actorId')
  @UserHistorySwagger.findByActorId()
  async findByActorId(
    @Param('actorId', ParseIntPipe) actorId: number,
  ): Promise<UserHistoryResponseDto[]> {
    return await this.userHistoryService.findByActorId(actorId);
  }

  @Post()
  @UserHistorySwagger.create()
  async create(
    @Body() dto: UserHistoryCreateDto,
  ): Promise<UserHistoryResponseDto> {
    return await this.userHistoryService.create(dto);
  }
}
