import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  title: string;

  @IsString()
  petId: string;

  @IsDateString()
  dateTime: string;

  @IsOptional()
  @IsString()
  clinic?: string;
}