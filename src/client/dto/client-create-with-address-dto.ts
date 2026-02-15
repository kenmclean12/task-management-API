import { AddressCreateDto } from 'src/address/dto';
import { ClientCreateDto } from './client-create-dto';

export class ClientCreateWithAddressDto extends ClientCreateDto {
  address: Omit<AddressCreateDto, 'clientId'>;
}
