import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsNumber, IsUUID } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsUUID()
  breedId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  age?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}