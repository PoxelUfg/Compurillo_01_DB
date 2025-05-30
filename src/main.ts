import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para permitir conexión desde Vercel u otros dominios
  app.enableCors({
    origin: '*', // o especificar Vercel si querés limitarlo
  });

  // ✅ Escuchar el puerto que proporciona Railway o fallback 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 App corriendo en el puerto ${port}`);
}
bootstrap();
