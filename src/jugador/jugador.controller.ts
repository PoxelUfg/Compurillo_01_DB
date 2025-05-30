import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { JugadorService } from './jugador.service';

@Controller('jugadores')
export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  @Post()
  crearJugador(@Body('nombre') nombre: string, @Body('salaId') salaId: number) {
    return this.jugadorService.crearJugador(nombre, salaId);
  }

  @Get()
  obtenerJugadores(@Query('salaId') salaId: string) {
    return this.jugadorService.obtenerJugadores(Number(salaId));
  }

  @Delete('anfitrion')
  eliminarAnfitrion() {
    return this.jugadorService.eliminarAnfitrion();
  }

    @Delete()
    eliminarTodos() {
    return this.jugadorService.eliminarTodos();
    }
}
