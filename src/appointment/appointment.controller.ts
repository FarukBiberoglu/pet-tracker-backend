import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtAuthGuard } from 'src/auth/guard/auh-guardt';
import { CurrentUser } from 'src/auth/decorator/current-user-dec';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.appointmentService.create(user.userId, dto);
  }

     @UseGuards(JwtAuthGuard)
     @Get()
      findAll(@CurrentUser() user: { userId: string }) {
      return this.appointmentService.findAll(user.userId);}

     @UseGuards(JwtAuthGuard)
     @Get('upcoming')
     getUpcoming(@CurrentUser() user: { userId: string }) {
      return this.appointmentService.getUpcoming(user.userId);
   }

     @UseGuards(JwtAuthGuard)
     @Get('completed')
     getCompleted(@CurrentUser() user: { userId: string }) {
     return this.appointmentService.getCompleted(user.userId);
}
}
