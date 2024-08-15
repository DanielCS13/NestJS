import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
import { Services } from './services.entity';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file ? file.path : null;
    return this.servicesService.createService({
      ...createServiceDto,
      image: imageUrl,
    });
  }

  @Get()
  getWorkshops(): Promise<Services[]> {
    return this.servicesService.getServices();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.getService(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }

    const existingService = await this.servicesService.getService(numericId);
    if (!existingService) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedData: UpdateServiceDto = {
      ...updateServiceDto,
      image: file ? file.path : existingService.image,
    };

    // Elimina la imagen antigua si se ha proporcionado una nueva
    if (file && existingService.image) {
      const oldImagePath = join(__dirname, '..', '..', existingService.image);
      console.log('Ruta del archivo a eliminar:', oldImagePath); // Agrega esta línea para depuración

      try {
        unlinkSync(oldImagePath);
      } catch (error) {
        console.error('Error al eliminar la imagen antigua:', error);
      }
    }

    return this.servicesService.updateService(numericId, updatedData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numericId = +id; // Convertir id a número
    const service = await this.servicesService.getService(numericId);
    if (!service) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }

    // Elimina la imagen asociada
    if (service.image) {
      try {
        unlinkSync(join(__dirname, '..', '..', service.image));
      } catch (error) {
        console.error('Error al eliminar la imagen: ', error);
      }
    }

    return this.servicesService.deleteService(numericId);
  }
}
