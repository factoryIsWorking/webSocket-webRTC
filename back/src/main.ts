import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import config from '../config';
import { init as daemonInit } from './common/daemon';
const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  daemonInit();
  console.log(`http://localhost:${PORT}/client/index.html`);
}
bootstrap();
