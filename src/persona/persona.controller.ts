import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './persona.entity';

@Controller('persona')
export class PersonaController {
  constructor(private personaService: PersonaService) {}

  @Post()
  createPersona(@Body() newPersona: CreatePersonaDto) {
    return this.personaService.createPersona(newPersona);
  }

  @Get()
  getPersonas(): Promise<Persona[]> {
    return this.personaService.getPersonas();
  }

  @Get(':nPerCodigo')
  getPersona(
    @Param('nPerCodigo', ParseIntPipe) nPerCodigo: number,
  ): Promise<Persona> {
    return this.personaService.getPersona(nPerCodigo);
  }

  @Delete(':nPerCodigo')
  deletePersona(@Param('nPerCodigo', ParseIntPipe) nPerCodigo: number) {
    return this.personaService.deletePersona(nPerCodigo);
  }

  @Patch(':nPerCodigo')
  updatePersona(
    @Param('nPerCodigo', ParseIntPipe) nPerCodigo: number,
    @Body()
    persona: UpdatePersonaDto,
  ) {
    return this.personaService.updatePersona(nPerCodigo, persona);
  }
}
