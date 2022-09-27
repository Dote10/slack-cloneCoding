import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!email) {
      throw new HttpException('이메일이 없습니다.', 400);
    }

    if (user) {
      throw new HttpException('이미 존재하는 사용자입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
