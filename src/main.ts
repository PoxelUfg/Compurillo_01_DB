import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 HABILITAR CORS PARA TODAS LAS RUTAS
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
