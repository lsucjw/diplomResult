import { NestFactory } from '@nestjs/core';
import Configurator from './utils/configurator/configurator';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Configurator.init(app)
    .addDefaultPipes()
    .addSwagger()
    .start((port) => {
      console.log(`Сервер запущен на порту: ${port}`);
    });
}

bootstrap();
