import { Factory } from 'src/common/common.type';
import { User } from '../user/user.factory';
//
export class Room {
  name: string;
  owner: User;
  constructor(name: string, owner: User) {
    this.name = name;
    this.owner = owner;
  }
}

export const RoomFactory = new Factory<Room>(Room);
