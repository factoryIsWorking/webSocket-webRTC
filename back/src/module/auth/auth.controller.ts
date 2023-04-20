import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly users: UsersService) {}

  @Post('tryLogin')
  tryLogin(@Body('name') name): { res: boolean } {
    console.log('tryLogin : ' + name);
    return {
      res: true,
    };
  }
  @Post('tryLogout')
  tryLogout(@Body('uid') uid): { res: boolean } {
    this.users.deleteByUid(uid);
    return {
      res: true,
    };
  }
}
