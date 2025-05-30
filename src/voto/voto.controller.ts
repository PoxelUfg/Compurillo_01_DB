import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { VotoService } from './voto.service';

@Controller()
export class VotoController {
  constructor(private readonly votoService: VotoService) {}

  @Post('votos')
  crearVoto(
    @Body('dibujoId') dibujoId: number,
    @Body('jugadorId') jugadorId: number,
    @Body('estrellas') estrellas: number,
  ) {
    return this.votoService.crearVoto(dibujoId, jugadorId, estrellas);
  }

  @Get('resultados')
  obtenerGanador(@Query('salaId') salaId: string) {
    return this.votoService.obtenerGanador(Number(salaId));
  }
}
