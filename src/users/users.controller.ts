import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { retryWhen } from 'rxjs';
import { User } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내정보 조회' })
  @Get()
  getUsers(@User() user) {
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
  login(@User() user) {
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
