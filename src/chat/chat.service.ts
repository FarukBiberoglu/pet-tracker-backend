import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async sendMessage(
    userId: string,
    message: string,
    sessionId?: string,
  ) {
    if (!message) {
      throw new BadRequestException('Message is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { activePet: true },
    });

    const pet = user?.activePet;

    let session;

    if (sessionId) {
      session = await this.prisma.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (session && session.userId !== userId) {
        throw new ForbiddenException('Access denied');
      }
    }

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: { userId, title: message.slice(0, 30) },
      });
    }

    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: message,
      },
    });

    const messages = await this.prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });

    const systemPrompt = `
You are a helpful pet assistant.

User's pet info:
Name: ${pet?.name ?? 'Unknown'}
Type: ${pet?.type ?? 'Unknown'}
Age: ${pet?.age ?? 'Unknown'}

Rules:
- Give short and clear answers
- Be friendly
- If the issue is serious, suggest visiting a veterinarian
`;

    const aiMessages = [
      {
        role: 'system' as const,
        content: systemPrompt,
      },
      ...messages.map((m) => ({
        role: (m.role === 'assistant'
          ? 'assistant'
          : 'user') as 'assistant' | 'user',
        content: m.content,
      })),
    ];

    let reply = '';

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: aiMessages,
      });

      reply = response.choices[0]?.message?.content ?? '';
    } catch {
      throw new InternalServerErrorException('AI error');
    }

    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: reply,
      },
    });

    return {
      reply,
      sessionId: session.id,
    };
  }

  async getSessions(userId: string) {
    return this.prisma.chatSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }

  async getMessages(userId: string, sessionId: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateTitle(userId: string, sessionId: string, title: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.chatSession.update({
      where: { id: sessionId },
      data: { title },
    });
  }


  async deleteSession(userId: string, sessionId: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
    });
  
    if (!session || session.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
  
    await this.prisma.chatMessage.deleteMany({
      where: { sessionId },
    });
  
    await this.prisma.chatSession.delete({
      where: { id: sessionId },
    });
  
    return { success: true };
  }


}