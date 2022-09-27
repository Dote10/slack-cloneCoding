import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginRequestDto } from '../users/dto/login.request.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //*password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }

    //* 유효성 검사가 끝났으면 프론트에 jwt를 반환해줘야 한다.
    // 그럼 프론트엔드가 그 jwt를 받아서 안전한 곳에 저장한다.

    //프론트에 jwt를 반환하려면 nestJwt에 존재하는 JwtService를 사용해야한다.

    const payload = { email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
