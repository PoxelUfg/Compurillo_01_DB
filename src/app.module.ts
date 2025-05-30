import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalaModule } from './sala/sala.module';
import { JugadorModule } from './jugador/jugador.module';
import { DibujoModule } from './dibujo/dibujo.module';
import { VotoModule } from './voto/voto.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SalaModule, JugadorModule, DibujoModule, VotoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
