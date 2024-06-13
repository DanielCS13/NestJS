//Create services.service like workshops.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  async createService(service: CreateServiceDto) {
    if (!service.titulo && !service.descripcion) {
      throw new HttpException(
        'Los campos título y descripción son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!service.titulo) {
      throw new HttpException(
        'El campo título es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!service.descripcion) {
      throw new HttpException(
        'El campo descripción es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const serviceFound = await this.servicesRepository.findOne({
      where: {
        titulo: service.titulo,
      },
    });

    if (serviceFound) {
      return new HttpException('Ese servicio ya existe.', HttpStatus.CONFLICT);
    }

    const newService = this.servicesRepository.create(service);
    return this.servicesRepository.save(newService);
  }

  getServices() {
    return this.servicesRepository.find();
  }

  getService(id: number) {
    return this.servicesRepository.findOne({
      where: { id },
    });
  }

  deleteService(id: number) {
    return this.servicesRepository.delete(id);
  }

  //Update service
  updateService(id: number, service: UpdateServiceDto) {
    return this.servicesRepository.update({ id }, service);
  }
}
