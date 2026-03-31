import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { DosageUnitEnum, FrequencyEnum } from './create-medication.dto';

export class UpdateMedicationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(FrequencyEnum)
  frequency?: FrequencyEnum;

  @ValidateIf((o: UpdateMedicationDto) => o.frequency === FrequencyEnum.OTHER)
  @IsString()
  @IsNotEmpty()
  frequencyCustom?: string;

  @IsOptional()
  @IsArray()
  times?: string[];

  @IsOptional()
  @IsNumber()
  dosageAmount?: number;

  @IsOptional()
  @IsEnum(DosageUnitEnum)
  dosageUnit?: DosageUnitEnum;

  @IsOptional()
  @IsString()
  notes?: string;
}