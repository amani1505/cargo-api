/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Headers,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this._authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this._userService.create(createUserDto);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return await this._authService.refreshToken(req.user);
  }

  @Get('signInWithToken')
  async signInWithToken(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<{ message: string }> {
    try {
      const token = authorizationHeader.replace('Bearer ', ''); // Extract the token from the "Bearer " prefix
      const decodedUser = await this._authService.verifyToken(token);

      return { message: 'Sign-in with token successful' };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
