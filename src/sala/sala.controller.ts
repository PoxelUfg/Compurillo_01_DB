import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { SalaService } from './sala.service';

@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  crearSala(@Body('palabra') palabra: string) {
    return this.salaService.crearSala(palabra);
  }

  @Get(':id')
  obtenerSala(@Param('id') id: string) {
    return this.salaService.obtenerSala(Number(id));
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.salaService.cambiarEstado(Number(id), estado);
  }

  @Delete('reset')
   reiniciarSala(@Query('salaId') salaId: string) {
    return this.salaService.reiniciarSala(Number(salaId));
  }

}
