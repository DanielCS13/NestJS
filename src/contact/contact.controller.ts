import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  // Patch,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
//   import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Contact } from './contact.entity';
import { MessageService } from '../message/message.service';

@Controller('contact')
export class ContactController {
  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
  ) {}

  @Post()
  async createContact(@Body() newContact: CreateContactDto) {
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
      return savedForm;
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
