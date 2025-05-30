import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotoService {
  constructor(private prisma: PrismaService) {}

  async crearVoto(dibujoId: number, jugadorId: number, estrellas: number) {
    await this.prisma.voto.create({
      data: {
        dibujoId,
        jugadorId,
        estrellas,
      },
    });

    const votosHechos = await this.prisma.voto.findMany({
        where: {
            jugadorId: jugadorId,
        }
    });

    const jugador = await this.prisma.jugador.findUnique({
        where: { id: jugadorId },
        include: { sala: {include: { jugadores: true } } },
    });

    const salaId = jugador?.salaId;

    const dibujosDeOtros = await this.prisma.dibujo.findMany({
        where: {
            salaId: salaId,
            jugadorId: { not: jugadorId }
        }
    });

    if (votosHechos.length >= dibujosDeOtros.length) {
    // ✅ Marcamos que este jugador terminó de votar
        await this.prisma.jugador.update({
            where: { id: jugadorId },
            data: { haVotado: true },
        });
    }

    const jugadoresSala = await this.prisma.jugador.findMany({
        where: { salaId: salaId },
    });

    const todosHanVotado = jugadoresSala.every(j => j.haVotado);

    if (todosHanVotado) {
        await this.prisma.sala.update({
            where: { id: salaId },
            data: { estado: "RESULTADOS" },
        });
    }

    return { ok: true };
  }


  async obtenerGanador(salaId: number) {
    const dibujos = await this.prisma.dibujo.findMany({
      where: { salaId },
      include: {
        jugador: true,
        votos: true,
      },
    });

    const resultados = dibujos.map((dibujo) => {
      const totalVotos = dibujo.votos.length;
      const suma = dibujo.votos.reduce((acc, voto) => acc + voto.estrellas, 0);
      const promedio = totalVotos > 0 ? suma / totalVotos : 1; // valor por defecto si nadie votó

      return {
        jugador: dibujo.jugador,
        promedio,
      };
    });

    if (resultados.length === 0) return { ganador: null };

    resultados.sort((a, b) => b.promedio - a.promedio);

    return { ganador: resultados[0] };
  }
}
