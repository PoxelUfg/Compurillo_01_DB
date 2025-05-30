import { Module } from '@nestjs/common';
import { VotoController } from './voto.controller';
import { VotoService } from './voto.service';

@Module({
  controllers: [VotoController],
  providers: [VotoService]
})
export class VotoModule {}
