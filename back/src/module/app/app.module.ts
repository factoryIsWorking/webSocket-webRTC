import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
//import { lobbyGateway } from 'src/provider/gateway/lobby.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { lobbyMW } from 'src/module/lobby/lobby.middleware';
import { resolve } from 'path';
import { GlobalModule } from 'src/module/global/global.module';
import { AuthModule } from '../auth/auth.module';
import { LobbyModule } from '../lobby/lobby.module';
import { UsersModule } from '../users/users.module';
import { AppGateway } from './app.gateway';
import { AppSocketService } from './app.socket.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../client'),
      serveRoot: '/client',
    }),
    GlobalModule,
    AuthModule,
    LobbyModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppGateway, AppSocketService],
})
export class AppModule {} //implements NestModule
