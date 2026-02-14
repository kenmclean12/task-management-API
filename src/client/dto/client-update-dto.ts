import { PartialType } from '@nestjs/swagger';
import { ClientCreateDto } from './client-create-dto';

export class ClientUpdateDto extends PartialType(ClientCreateDto) {}
