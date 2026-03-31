import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, dto: CreateAppointmentDto) {
    const pet = await this.prisma.pet.findFirst({
      where: {
        id: dto.petId,
        ownerId: userId
      }
    });
    if (!pet) {
      throw new ForbiddenException('Pet not found');
    }

    return this.prisma.appointment.create({
      data: {
        title: dto.title,
        clinic: dto.clinic,
        dateTime: new Date(dto.dateTime),
        petId: dto.petId,
      },
    });
  }


  async findAll(userId: string) {
    return this.prisma.appointment.findFirst({
      where: {
        pet: {
          ownerId: userId
        },
      },
      include: {
        pet: true
      },
      orderBy: {
        dateTime: 'asc'
      }
    })
  }

  async getUpcoming(userId: string) {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: {
        pet: { ownerId: userId },
        dateTime: { gt: now },
      },
      include: {
        pet: true,
      },
      orderBy: {
        dateTime: 'asc',
      },
    });
  }

  async getCompleted(userId: string) {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: {
        pet: { ownerId: userId },
        dateTime: { lt: now },
      },
      include: {
        pet: true,
      },
      orderBy: {
        dateTime: 'desc',
      },
    });
  }


}

