import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { CurrentUser } from 'src/auth/decorator/current-user-dec';
import { JwtAuthGuard } from 'src/auth/guard/auh-guardt';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

    @UseGuards(JwtAuthGuard)
   @Post()
    create(
  @CurrentUser() user: { userId: string },
  @Body() dto: CreateMedicationDto,
) {
  return this.medicationService.create(user.userId, dto);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
update(
  @CurrentUser() user: { userId: string },
  @Param('id') id: string,
  @Body() dto: UpdateMedicationDto,
) {
  return this.medicationService.update(user.userId, id, dto);
}@UseGuards(JwtAuthGuard)
@Delete(':id')
delete(
  @CurrentUser() user: { userId: string },
  @Param('id') id: string,
) {
  return this.medicationService.delete(user.userId, id);
}

@UseGuards(JwtAuthGuard)
@Get()
findAll(
  @CurrentUser() user: { userId: string },
  @Query('petId') petId?: string,
) {
  return this.medicationService.findAll(user.userId, petId);
}
}
