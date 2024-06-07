import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}

  createPersona(persona: CreatePersonaDto) {
    const personaFound = this.personaRepository.findOne({
      where: {
        cPerApellido: persona.cPerApellido,
        cPerNombre: persona.cPerNombre,
      },
    });

    if (personaFound) {
      return new HttpException('Persona already exists', HttpStatus.CONFLICT);
    }

    const newPersona = this.personaRepository.create(persona);
    return this.personaRepository.save(newPersona);
  }

  getPersonas() {
    return this.personaRepository.find();
  }

  getPersona(nPerCodigo: number) {
    return this.personaRepository.findOne({
      where: { nPerCodigo },
    });
  }

  deletePersona(nPerCodigo: number) {
    return this.personaRepository.delete(nPerCodigo);
  }

  //Update persona
  updatePersona(nPerCodigo: number, persona: UpdatePersonaDto) {
    return this.personaRepository.update({ nPerCodigo }, persona);
  }
}
