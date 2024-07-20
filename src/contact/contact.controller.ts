import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  Request as Req,
  // Patch,
  Delete,
  BadRequestException,
  // HttpStatus,
  // HttpException,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
//   import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Contact } from './contact.entity';
import { MessageService } from '../message/message.service';
import { Request } from 'express';

@Controller('contact')
export class ContactController {
  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
  ) {}

  @Get('cookie')
  getCookie(@Req() request: Request): string {
    // Leer la cookie desde la solicitud
    // Hacer algo con la cookie, como pasarla a una vista
    try {
      const myCookie = request.cookies['session'];
      return `Cookie value: ${myCookie}`;
    } catch (error) {
      return 'No cookie found';
    }
  }

  @Post()
  async createContact(
    @Req() request: Request,
    @Body() newContact: CreateContactDto,
  ) {
    // Limitar el envío de formularios
    const currentTime = Date.now();
    const submissionLimit = 1; // Número máximo de envíos permitidos
    const timeWindow = 1000 * 60 * 60; // 1 hora

    if (!request.session.submissions) {
      request.session.submissions = {
        count: 0,
        lastSubmissionTime: currentTime,
      };
    }

    const { count, lastSubmissionTime } = request.session.submissions;

    if (
      currentTime - lastSubmissionTime < timeWindow &&
      count >= submissionLimit
    ) {
      throw new BadRequestException(
        'Has alcanzado el límite de envíos permitidos. Intenta más tarde.',
      );
    }

    if (currentTime - lastSubmissionTime >= timeWindow) {
      request.session.submissions.count = 1;
      request.session.submissions.lastSubmissionTime = currentTime;
    } else {
      request.session.submissions.count += 1;
    }

    const contact = new Contact();
    contact.name = newContact.name;
    contact.email = newContact.email;
    contact.issue = newContact.issue;
    contact.message = newContact.message;
    contact.frontend = newContact.frontend;

    try {
      await this.messageService.sendMail(
        contact.email, // El destinatario del correo
        contact.issue,
        `Has recibido una respuesta`,
        `<p>Has recibido una respuesta 2</p>`,
      );

      const savedForm = await this.contactService.createContact(contact);
      return {
        message: 'Contacto guardado correctamente',
        savedForm,
        visits: request.session.submissions.count,
      };
    } catch (error) {
      console.error('Error al enviar el correo o guardar el contacto:', error);
    }
  }

  @Get()
  getContacts(): Promise<Contact[]> {
    return this.contactService.getContacts();
  }

  @Get(':id')
  getContact(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactService.getContact(id);
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id);
  }

  // @Patch(':id')
  // updatePersona(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body()
  //   persona: UpdatePersonaDto,
  // ) {
  //   return this.contactService.updatePersona(id, persona);
  // }
}
