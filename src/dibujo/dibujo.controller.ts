import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DibujoService } from './dibujo.service';

@Controller('dibujos')
export class DibujoController {
  constructor(private readonly dibujoService: DibujoService) {}

  @Post()
  crearDibujo(
    @Body('jugadorId') jugadorId: number,
    @Body('salaId') salaId: number,
    @Body('imagenBase64') imagenBase64: string,
  ) {
    return this.dibujoService.crearDibujo(jugadorId, salaId, imagenBase64);
  }

  @Get()
  obtenerDibujos(@Query('salaId') salaId: string) {
    return this.dibujoService.obtenerDibujos(Number(salaId));
  }
}
