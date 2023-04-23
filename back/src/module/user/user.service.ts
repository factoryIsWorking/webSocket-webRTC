import { Injectable } from '@nestjs/common';
import { UserFactory } from './user.factory';

@Injectable()
export class UserService {
  constructor() {}
  makeNewUser(name: string) {
    const newUser = UserFactory.make(name);
    console.log(newUser);
  }
}
