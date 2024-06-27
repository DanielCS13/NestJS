import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createContact(contact: CreateContactDto) {
    if (!contact.name || !contact.email || !contact.issue) {
      throw new HttpException(
        'Los campos nombre, correo y asunto son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!contact.message) {
      throw new HttpException(
        'El campo mensaje es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!contact.frontend) {
      throw new HttpException(
        'El campo tipo de frontend es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner =
      this.contactRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const contactFound = await this.contactRepository.findOne({
        where: {
          name: contact.name,
        },
      });

      if (contactFound) {
        throw new HttpException('Contact already exists', HttpStatus.CONFLICT);
      }

      const newContact = this.contactRepository.create(contact);
      await queryRunner.manager.save(newContact);

      await queryRunner.commitTransaction();
      return newContact;
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

  getContacts() {
    return this.contactRepository.find();
  }

  getContact(id: number) {
    return this.contactRepository.findOne({
      where: { id },
    });
  }

  deleteContact(id: number) {
    return this.contactRepository.delete(id);
  }

  //Update Contact
  //   updateContact(id: number, Contact: UpdateContactDto) {
  //     return this.contactRepository.update({ id }, Contact);
  //   }
}
