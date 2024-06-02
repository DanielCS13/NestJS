import { Module } from '@nestjs/common';
import { WorkshopsController } from './workshops.controller';
import { WorkshopsService } from './workshops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from './workshops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop])],
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
})
export class WorkshopsModule {}
