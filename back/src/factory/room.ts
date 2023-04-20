import { Factory } from 'src/common/common.type';
import { User } from './user';

//
export class Room {
  name: string;
  owner: User;
  constructor(name: string, owner: User) {
    this.name = name;
  }
}

export const RoomFactory = new Factory<Room>();
