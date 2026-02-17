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
import { UserService } from './user.service';
import {
  PasswordResetDto,
  UserCreateDto,
  UserResponseDto,
  UserUpdateDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { UserSwagger } from './utils';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UserSwagger.findOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  @Get()
  @UserSwagger.findAll()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UserSwagger.create()
  async create(
    @Req() req,
    @Body() dto: UserCreateDto,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.userService.create(userId, dto);
  }

  @Patch(':id')
  @UserSwagger.update()
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.userService.update(id, userId, dto);
  }

  @Patch('change-password/:id')
  @UserSwagger.changePassword()
  async changePassword(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PasswordResetDto,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.userService.changePassword(id, userId, dto);
  }

  @Delete(':id')
  @UserSwagger.remove()
  async remove(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.userService.remove(id, userId);
  }
}
