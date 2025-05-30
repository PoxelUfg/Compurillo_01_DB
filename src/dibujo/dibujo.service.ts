import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DibujoService {
  constructor(private prisma: PrismaService) {}

  async crearDibujo(jugadorId: number, salaId: number, imagenBase64: string) {
    await this.prisma.dibujo.create({
      data: {
        jugadorId,
        salaId,
        imagenBase64,
      },
    });

    await this.prisma.jugador.update({
        where: { id: jugadorId },
        data: { haDibujado: true },
    });

    const jugadores = await this.prisma.jugador.findMany({
        where: { salaId },
    });

    const hanDibujado = jugadores.filter(j => j.haDibujado).length;

    console.log("Jugadores en sala:", jugadores.map(j => ({ id: j.id, nombre: j.nombre, haDibujado: j.haDibujado })));

    // Verificar si el número coincide con el total de jugadores
    if (hanDibujado === jugadores.length && jugadores.length > 0) {
    await this.prisma.sala.update({
        where: { id: salaId },
        data: { estado: "VOTANDO" },
    });
    }

    return { ok: true};
  }

  obtenerDibujos(salaId: number) {
    return this.prisma.dibujo.findMany({
      where: { salaId },
      include: {
        jugador: true,
      },
    });
  }
}
