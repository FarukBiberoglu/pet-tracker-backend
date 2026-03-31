import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { DosageUnit } from '@prisma/client';

export class UpdateMedicationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsArray()
  times?: string[];

  @IsOptional()
  @IsNumber()
  dosageAmount?: number;

  @IsOptional()
  @IsEnum(DosageUnit)
  dosageUnit?: DosageUnit;

  @IsOptional()
  @IsString()
  notes?: string;
}