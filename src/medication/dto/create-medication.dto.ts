import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';

enum DosageUnitEnum {
  TABLET = 'TABLET',
  ML = 'ML',
  CAPSULE = 'CAPSULE',
  DROP = 'DROP',
  INJECTION = 'INJECTION',
  OTHER = 'OTHER',
}

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  petId: string;

  @IsArray()
  times: string[];

  @IsString()
  frequency: string;

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