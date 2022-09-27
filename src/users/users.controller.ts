import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { retryWhen } from 'rxjs';
import { CurrentUser } from 'src/common/decorators/currentuser.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { Users } from './entities/Users';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내정보 조회' })
  @Get()
  getUsers(@CurrentUser() user: Users) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  join(@Body() body: JoinRequestDto) {
    this.usersService.join(body.email, body.nickname, body.password);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@CurrentUser() user: Users) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logOut')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
