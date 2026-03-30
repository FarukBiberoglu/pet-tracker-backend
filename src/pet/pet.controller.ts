import {
    Body,
    Controller,
    Post,
    Get,
    UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { JwtAuthGuard } from 'src/auth/guard/auh-guardt';
import { CurrentUser } from 'src/auth/decorator/current-user-dec';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @CurrentUser() user: { userId: string },
        @Body() dto: CreatePetDto,
    ) {
        return this.petService.create(user.userId, dto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@CurrentUser() user: { userId: string }) {
        return this.petService.findAll(user.userId);
    }


    @UseGuards(JwtAuthGuard)
    @Get('active')
    getActive(@CurrentUser() user: { userId: string }) {
        return this.petService.getActivePet(user.userId);
    }
}