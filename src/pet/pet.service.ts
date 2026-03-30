import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetService {
    constructor(private readonly prisma : PrismaService){}

    async create(userId: string, dto: CreatePetDto) {
        return this.prisma.$transaction(async (tx: any) => {
          
          const pet = await tx.pet.create({
            data: {
              ...dto,
              ownerId: userId,
            },
          });
      
          await tx.user.update({
            where: { id: userId },
            data: {
              activePet: {
                connect: { id: pet.id },
              },
            },
          });
      
          return pet;
        });
      }
}
