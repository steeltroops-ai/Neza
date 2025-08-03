import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [ServicesController, CategoriesController],
  providers: [ServicesService, CategoriesService],
  exports: [ServicesService, CategoriesService],
})
export class ServicesModule {}