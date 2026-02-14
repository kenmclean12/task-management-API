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
import { UserSwagger } from './utils/swaggerDecorators';

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
  async create(@Body() dto: UserCreateDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  @UserSwagger.update()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, dto);
  }

  @Patch('change-password')
  @UserSwagger.changePassword()
  async changePassword(
    @Req() req,
    @Body() dto: PasswordResetDto,
  ): Promise<UserResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as number;
    return await this.userService.changePassword(userId, dto);
  }

  @Delete(':id')
  @UserSwagger.remove()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.remove(id);
  }
}
