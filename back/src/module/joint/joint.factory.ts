import { Factory } from 'src/common/common.type';
import { Room } from '../room/room.factory';
import { User } from '../user/user.factory';
import { Socket } from 'socket.io';

//
export class Joint<A, B> {
  objA: A;
  objB: B;
  constructor(a: A, b: B) {
    this.objA = a;
    this.objB = b;
    Object.defineProperties(this, {
      _getOpposite: {
        value: function () {},
        writable: false,
      },
      _break: {
        value: function () {},
        writable: false,
      },
    });
  }
}

export const JointFactory = {
  user_room: new Factory<Joint<User, Room>>(Joint),
  user_socket: new Factory<Joint<User, Socket>>(Joint),
};
