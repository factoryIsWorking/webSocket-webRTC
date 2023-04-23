import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import config from 'config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'app',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected' + client);
  }
  handleDisconnect(client: Socket) {
    const handlers = {
      DELETE_SOCKET() {
        client.disconnect();
        console.log('Client disconnected' + client);
      },
      DELETE_USER() {
        this.usersService.deleteByUid(
          this.usersService.getUserBySocket(client).uid,
        );
        console.log('Client disconnected' + client);
      },
    };
    handlers[config.DISCONNECT_TYPE]();
  }
  afterInit(server: any) {
    console.log('WS inited');
  }
}
