import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
