import { Injectable } from '@nestjs/common';
import { User, UserFactory } from './user.model';

@Injectable()
export class UserService {
  constructor() {}
  makeNewUser(name: string): User {
    const newOne = UserFactory.make({ name: name });
    return newOne;
  }
}
