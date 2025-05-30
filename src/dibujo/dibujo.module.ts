import { Module } from '@nestjs/common';
import { DibujoController } from './dibujo.controller';
import { DibujoService } from './dibujo.service';

@Module({
  controllers: [DibujoController],
  providers: [DibujoService]
})
export class DibujoModule {}
