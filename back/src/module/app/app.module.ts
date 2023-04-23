import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
//import { lobbyGateway } from 'src/provider/gateway/lobby.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AuthModule } from '../auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../client'),
      serveRoot: '/client',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {} //implements NestModule
