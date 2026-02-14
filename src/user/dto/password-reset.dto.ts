import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty({ description: 'old password' })
  @MaxLength(50)
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'new password' })
  @MaxLength(50)
  @IsString()
  newPassword: string;
}
