import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
    });
  }

  //프론트에서 저장된 jwt가 날라왔을때
  //해당하는 것을 읽고 jwt에서 payload를 뽑아 냈다면
  //그 payload에 대해서 유효성 검증을 해주어야 한다.
  //그 유효성 검증을 하는 function
  //async validate(payload) {}
}
