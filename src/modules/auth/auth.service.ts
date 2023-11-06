import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this._userService.findOneByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.full_name,
        phone_number: user.mobile_number,
      },
    };

    return {
      ...user,
      accessToken: this._jwtService.sign(payload),
      refreshToken: this._jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.full_name,
        phone_number: user.mobile_number,
      },
    };

    return {
      accessToken: this._jwtService.sign(payload),
    };
  }
}
