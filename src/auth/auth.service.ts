import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async createAnonymousUser() {
    const user = await this.prisma.user.create({
      data: {},
    });

    const token = this.jwtService.sign({
      sub: user.id,
    });

    return {
      accessToken: token,
      userId: user.id,
    };
  }
}