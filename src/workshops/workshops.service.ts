import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workshop } from './workshops.entity';
import { Repository } from 'typeorm';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: Repository<Workshop>,
  ) {}

  async createWorkshop(workshop: CreateWorkshopDto) {
    const workshopFound = await this.workshopRepository.findOne({
      where: {
        name: workshop.name,
      },
    });

    if (workshopFound) {
      return new HttpException('Workshop already exists', HttpStatus.CONFLICT);
    }

    const newWorkshop = this.workshopRepository.create(workshop);
    return this.workshopRepository.save(newWorkshop);
  }

  getWorkshops() {
    return this.workshopRepository.find();
  }

  getWorkshop(id: number) {
    return this.workshopRepository.findOne({
      where: { id },
    });
  }

  deleteWorkshop(id: number) {
    return this.workshopRepository.delete(id);
  }

  //Update workshop
  updateWorkshop(id: number, workshop: UpdateWorkshopDto) {
    return this.workshopRepository.update({ id }, workshop);
  }
}
