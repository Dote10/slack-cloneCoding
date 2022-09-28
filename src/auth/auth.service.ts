import { Injectable } from '@nestjs/common';
import { LoingRequestDto } from 'src/users/dto/login.Request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async jwtLogIn(data: LoingRequestDto) {}
}
