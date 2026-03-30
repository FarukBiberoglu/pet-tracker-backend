import { Controller, Get, Query } from '@nestjs/common';
import { BreedService } from './breed.service';

@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
getBreeds(
  @Query('type') type: string,
  @Query('search') search?: string,
) {
  return this.breedService.getBreeds(type, search);
}

  



}