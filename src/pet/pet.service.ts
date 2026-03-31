import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Prisma } from '@prisma/client';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async create(userId: string, dto: CreatePetDto) {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { activePetId: true },
      });

      if (!user?.activePetId) {
        await tx.user.update({
          where: { id: userId },
          data: {
            activePetId: pet.id,
          },
        });
      }

      await this.redis.del(`pets:${userId}`);
      await this.redis.del(`activePet:${userId}`);

      return pet;
    });
  }

  async findAll(userId: string) {
    const cacheKey = `pets:${userId}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) return cached;

    const pets = await this.prisma.pet.findMany({
      where: {
        ownerId: userId,
      },
      include: { breed: true },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await this.redis.set(cacheKey, pets, 60);

    return pets;
  }

  async getActivePet(userId: string) {
    const cacheKey = `activePet:${userId}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) return cached;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { activePet: { include: { breed: true } } },
    });

    const pet = user?.activePet ?? null;

    await this.redis.set(cacheKey, pet, 60);

    return pet;
  }
}