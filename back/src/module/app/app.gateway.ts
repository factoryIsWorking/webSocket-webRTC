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
import { ActionRequest } from './socket.type';
import { Server, Socket } from 'socket.io';
import { AppSocketService } from './app.socket.service';
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
  constructor(private readonly app: AppSocketService) {}
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

  @WebSocketServer() server: Server;

  @SubscribeMessage('app')
  appSocket(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: ActionRequest,
  ) {
    this.app.dealSocket(socket, data);
  }
}
