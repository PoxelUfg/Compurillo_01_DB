import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  crearSala(palabra: string) {
    return this.prisma.sala.create({
      data: {
        estado: 'LOBBY',
        palabra,
      },
    });
  }

  obtenerSala(id: number) {
    return this.prisma.sala.findUnique({
      where: { id },
      include: {
        jugadores: true,
        dibujos: true,
      },
    });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    return this.prisma.sala.update({
      where: { id },
      data: { estado: nuevoEstado },
    });
  }

  async reiniciarSala(salaId: number) {
  // 1. Eliminar votos de los dibujos de esta sala
    await this.prisma.voto.deleteMany({
        where: {
        dibujo: {
            salaId,
        },
        },
    });

    // 2. Eliminar dibujos de esta sala
    await this.prisma.dibujo.deleteMany({
        where: { salaId },
    });

    // 3. Eliminar jugadores que NO son anfitriones
    await this.prisma.jugador.deleteMany({
        where: {
        salaId,
        anfitrion: false,
        },
    });

    // 4. Reiniciar el estado de la sala a LOBBY
    return this.prisma.sala.update({
        where: { id: salaId },
        data: {
        estado: 'LOBBY',
        },
    });
    }

}
