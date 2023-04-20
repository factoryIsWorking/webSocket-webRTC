import { Factory } from 'src/common/common.type';
import { getUid } from 'src/common/utilite';

//
export class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export const UserFactory = new Factory<User>();
