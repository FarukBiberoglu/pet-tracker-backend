import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PetModule } from './pet/pet.module';
import { BreedModule } from './breed/breed.module';

@Module({
  imports: [PrismaModule, AuthModule, PetModule, BreedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
