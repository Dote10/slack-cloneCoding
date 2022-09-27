import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/Users';

export class LoginRequestDto extends PickType(Users, [
  'email',
  'password',
] as const) {}
