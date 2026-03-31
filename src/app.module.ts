import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PetModule } from './pet/pet.module';
import { BreedModule } from './breed/breed.module';
import { ChatModule } from './chat/chat.module';
import { RedisModule } from './redis/redis.module';
import { MedicationModule } from './medication/medication.module';
import { AppointmentModule } from './appointment/appointment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    PrismaModule,
    AuthModule,
    PetModule,
    BreedModule,
    ChatModule,
    MedicationModule,
    AppointmentModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
