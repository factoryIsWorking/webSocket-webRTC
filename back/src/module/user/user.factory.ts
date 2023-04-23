import { Factory } from 'src/common/common.type';
import { getUid } from 'src/common/utilite';

//
export class User {
  name: string;
  uid: string;
  constructor(name: string) {
    this.name = name;
    this.uid = getUid();
  }
}

export const UserFactory = new Factory<User>(User);
