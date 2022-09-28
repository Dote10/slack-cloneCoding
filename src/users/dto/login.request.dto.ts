import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/Users';

export class LoingRequestDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
