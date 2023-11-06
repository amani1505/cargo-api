import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from '../user/create-user.dto';
import { UserService } from '../user/user.service';
import { RefreshJwtAuthGuard } from './guard/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this._authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this._userService.create(createUserDto);
  }

  //  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return await this._authService.refreshToken(req.user);
  }
}
