import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  // Patch,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
//   import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Body() newContact: CreateContactDto) {
    const contact = new Contact();
    contact.name = newContact.name;
    contact.email = newContact.email;
    contact.issue = newContact.issue;
    contact.message = newContact.message;
    contact.frontend = newContact.frontend;

    return this.contactService.createContact(contact);
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
