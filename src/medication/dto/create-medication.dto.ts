import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export enum DosageUnitEnum {
  TABLET = 'TABLET',
  ML = 'ML',
  CAPSULE = 'CAPSULE',
  DROP = 'DROP',
  INJECTION = 'INJECTION',
  OTHER = 'OTHER',
}

export enum FrequencyEnum {
  ONCE_DAILY = 'ONCE_DAILY',
  TWICE_DAILY = 'TWICE_DAILY',
  EVERY_8_HOURS = 'EVERY_8_HOURS',
  WEEKLY = 'WEEKLY',
  AS_NEEDED = 'AS_NEEDED',
  OTHER = 'OTHER',
}

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  petId: string;

  @IsArray()
  times: string[];

  @IsEnum(FrequencyEnum)
  frequency: FrequencyEnum;

  @ValidateIf((o: CreateMedicationDto) => o.frequency === FrequencyEnum.OTHER)
  @IsString()
  @IsNotEmpty()
  frequencyCustom?: string;

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