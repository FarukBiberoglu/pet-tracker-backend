import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedicationService {
  
  constructor (private prisma : PrismaService){}

  async create(userId: string, dto: CreateMedicationDto) {
    return this.prisma.$transaction(async (tx) => {
  
      const pet = await tx.pet.findFirst({
        where: {
          id: dto.petId,
          ownerId: userId,
        },
      });
  
      if (!pet) {
        throw new ForbiddenException('Pet not found');
      }
  
      const medication = await tx.medication.create({
        data: {
          name: dto.name,
          petId: dto.petId,
          frequency: dto.frequency,
          dosageAmount: dto.dosageAmount,
          dosageUnit: dto.dosageUnit,
          notes: dto.notes,
  
          times: {
            create: dto.times.map((t) => ({
              time: t,
            })),
          },
        },
        include: { times: true },
      });
  
      return medication;
    });
  }

  async update(
    userId: string,
    medicationId: string,
    dto: UpdateMedicationDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      
      const medication = await tx.medication.findUnique({
        where: { id: medicationId },
        include: {
          pet: true,
        },
      });
  
      if (!medication || medication.pet.ownerId !== userId) {
        throw new ForbiddenException('Access denied');
      }
  
      if (dto.times) {
        await tx.medicationTime.deleteMany({
          where: { medicationId },
        });
      }
  
      const updated = await tx.medication.update({
        where: { id: medicationId },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.frequency && { frequency: dto.frequency }),
          ...(dto.dosageAmount !== undefined && {
            dosageAmount: dto.dosageAmount,
          }),
          ...(dto.dosageUnit && {
            dosageUnit: dto.dosageUnit,
          }),
          ...(dto.notes && { notes: dto.notes }),
  
          ...(dto.times && {
            times: {
              create: dto.times.map((t) => ({
                time: t,
              })),
            },
          }),
        },
        include: { times: true },
      });
  
      return updated;
    });
  }
  async delete(userId: string, medicationId: string) {
    return this.prisma.$transaction(async (tx) => {
  
      const medication = await tx.medication.findUnique({
        where: { id: medicationId },
        include: {
          pet: true,
        },
      });
  
      if (!medication || medication.pet.ownerId !== userId) {
        throw new ForbiddenException('Access denied');
      }
  
      await tx.medicationTime.deleteMany({
        where: { medicationId },
      });
  
      await tx.medication.delete({
        where: { id: medicationId },
      });
  
      return { success: true };
    });
  }

  async findAll(userId: string, petId?: string) {
    return this.prisma.medication.findMany({
      where: {
        ...(petId && {
          petId,
        }),
        pet: {
          ownerId: userId,
        },
      },
      include: {
        times: true,
        pet: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

}
