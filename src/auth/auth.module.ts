import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    //나중에 만들 strategy에 대해 설정
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    //login할때 사용
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1y' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
