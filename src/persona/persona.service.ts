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

  async createPersona(persona: CreatePersonaDto) {
    if (!persona.cPerApellido || !persona.cPerNombre || !persona.cPerFecNac) {
      throw new HttpException(
        'Los campos apellido, nombre y fecha de nacimiento son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!persona.nPerEdad) {
      throw new HttpException(
        'El campo edad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!persona.nPerSueldo) {
      throw new HttpException(
        'El campo sueldo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!persona.cPerEstado) {
      throw new HttpException(
        'El campo estado es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner =
      this.personaRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const personaFound = await this.personaRepository.findOne({
        where: {
          cPerApellido: persona.cPerApellido,
          cPerNombre: persona.cPerNombre,
        },
      });

      if (personaFound) {
        throw new HttpException('Persona already exists', HttpStatus.CONFLICT);
      }

      const newPersona = this.personaRepository.create(persona);
      await queryRunner.manager.save(newPersona);

      await queryRunner.commitTransaction();
      return newPersona;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
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
