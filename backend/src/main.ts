import { NestFactory } from '@nestjs/core';
import Configurator from './utils/configurator/configurator.util';
import { AppModule } from './modules/app.module';
import * as chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Configurator.init(app)
    .addDefaultPipes()
    .addSwagger()
    .start((port) => {
      console.log(`Сервер запущен на порту: ${port}`);
      console.log(`Swagger: ${chalk.red(`http://localhost:${port}/swagger`)}`);
    });
}

// Тут ещё какие то изменения

bootstrap();

// Тут типа изменения
