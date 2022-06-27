import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/Users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ){}

  async join(email: string, nickname: string, password: string) {
     const user = await this.usersRepository.findOne({where:{email}});
  }
}


