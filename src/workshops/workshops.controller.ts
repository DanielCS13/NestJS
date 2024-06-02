import {
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { WorkshopsService } from './workshops.service';
import { Workshop } from './workshops.entity';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Controller('workshops')
export class WorkshopsController {
  constructor(private workshopsService: WorkshopsService) {}

  @Post()
  createWorkshop(@Body() newWorkshop: CreateWorkshopDto) {
    return this.workshopsService.createWorkshop(newWorkshop);
  }

  @Get()
  getWorkshops(): Promise<Workshop[]> {
    return this.workshopsService.getWorkshops();
  }

  @Get(':id')
  getWorkshop(@Param('id', ParseIntPipe) id: number): Promise<Workshop> {
    return this.workshopsService.getWorkshop(id);
  }

  //Delete workshop
  @Delete(':id')
  deleteWorkshop(@Param('id', ParseIntPipe) id: number) {
    return this.workshopsService.deleteWorkshop(id);
  }

  //Patch workshop
  @Patch(':id')
  updateWorkshop(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    workshop: UpdateWorkshopDto,
  ) {
    return this.workshopsService.updateWorkshop(id, workshop);
  }
}
