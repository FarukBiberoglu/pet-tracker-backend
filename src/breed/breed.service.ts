import { Injectable } from '@nestjs/common';
import { contains } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BreedService {
    constructor (private prismaService : PrismaService){}

   private get prisma(): any {
    return this.prismaService;
   }

   async getBreeds(type: string, search?: string) {
    return this.prisma.breed.findMany({
      where: {
        type,
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
