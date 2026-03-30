import { BadRequestException, Injectable } from '@nestjs/common';
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
      if (dto.breedId) {
        const exists = await tx.breed.findUnique({
          where: { id: dto.breedId },
          select: { id: true },
        });
        if (!exists) {
          throw new BadRequestException('Invalid breedId');
        }
      }

      const pet = await tx.pet.create({
        data: {
          name: dto.name,
          type: dto.type,
          age: dto.age,
          weight: dto.weight,
          photoUrl: dto.photoUrl,
          ...(dto.breedId ? { breedId: dto.breedId } : {}),
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
      include: { activePet: { include: { breed: true } } },
    });

    return user?.activePet ?? null;
  }
}