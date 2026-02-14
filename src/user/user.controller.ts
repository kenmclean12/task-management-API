/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  // ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('User')
// @ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiOkResponse({ type: UserResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ description: 'List of all users', type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserCreateDto })
  @ApiOkResponse({ type: UserResponseDto })
  async create(@Body() dto: UserCreateDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user information by user ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiBody({ type: UserUpdateDto })
  @ApiOkResponse({ description: 'User updated', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, dto);
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiOkResponse({
    description: 'Password reset successful',
    type: UserResponseDto,
  })
  @ApiBody({ type: PasswordResetDto })
  async changePassword(
    @Req() req,
    @Body() dto: PasswordResetDto,
  ): Promise<UserResponseDto> {
    const userId = req.user.id as number;
    return await this.userService.changePassword(userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the user' })
  @ApiOkResponse({ description: 'User deleted', type: UserResponseDto })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.remove(id);
  }
}
