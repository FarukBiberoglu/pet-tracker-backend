import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma(): any {
    return this.prismaService;
  }

  async create(userId: string, dto: CreatePetDto) {
    return this.prisma.$transaction(async (tx: any) => {
      const pet = await tx.pet.create({
        data: {
          name: dto.name,
          type: dto.type,
          age: dto.age,
          weight: dto.weight,
          photoUrl: dto.photoUrl,
          ...(dto.breedId ? { breed: { connect: { id: dto.breedId } } } : {}),
          ownerId: userId,
        },
        include: { breed: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          activePet: { connect: { id: pet.id } },
        },
      });

      return pet;
    });
  }

  async findAll(userId: string) {
    return this.prisma.pet.findMany({
      where: {
        ownerId: userId,
      },
      include: { breed: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getActivePet(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { activePet: true },
    });

    return user?.activePet ?? null;
  }
}