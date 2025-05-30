import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JugadorService {
  constructor(private prisma: PrismaService) {}

  async crearJugador(nombre: string, salaId: number) {
    const jugadoresEnSala = await this.prisma.jugador.findMany({
      where: { salaId },
    });

    const esAnfitrion = jugadoresEnSala.length === 0;

    return this.prisma.jugador.create({
      data: {
        nombre,
        salaId,
        anfitrion: esAnfitrion,
      },
    });
  }

  obtenerJugadores(salaId: number) {
    return this.prisma.jugador.findMany({
      where: { salaId },
    });
  }

  eliminarAnfitrion() {
    return this.prisma.jugador.deleteMany({
      where: { anfitrion: true },
    });
  }

    async eliminarTodos() {
    await this.prisma.voto.deleteMany();    // 1. Borrar votos
    await this.prisma.dibujo.deleteMany();  // 2. Borrar dibujos
    return this.prisma.jugador.deleteMany(); // 3. Borrar jugadores
    }
}
