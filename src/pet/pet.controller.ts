import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { JwtAuthGuard } from 'src/auth/guard/auh-guardt';
import { CurrentUser } from 'src/auth/decorator/current-user-dec';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pet')
export class PetController {
    constructor (private readonly petService : PetService){}

    @UseGuards(JwtAuthGuard)
    @Post()

    create(
        @CurrentUser() user : any,
        @Body() dto : CreatePetDto ,
    ){
        return this.petService.create(user.userId, dto);

    }
}
