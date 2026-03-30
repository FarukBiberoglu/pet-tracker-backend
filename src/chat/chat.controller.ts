import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChatService } from './chat.service';
import { ChatDto, UpdateChatTitleDto } from './dto/chat-dto';
import { JwtAuthGuard } from 'src/auth/guard/auh-guardt';
import { CurrentUser } from 'src/auth/decorator/current-user-dec';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Post()
  chat(
    @CurrentUser() user: { userId: string },
    @Body() dto: ChatDto,
  ) {
    return this.chatService.sendMessage(
      user.userId,
      dto.message,
      dto.sessionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  getSessions(@CurrentUser() user: { userId: string }) {
    return this.chatService.getSessions(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sessionId')
  getMessages(
    @CurrentUser() user: { userId: string },
    @Param('sessionId') sessionId: string,
  ) {
    return this.chatService.getMessages(user.userId, sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('sessions/:sessionId/title')
  updateTitle(
    @CurrentUser() user: { userId: string },
    @Param('sessionId') sessionId: string,
    @Body() dto: UpdateChatTitleDto,
  ) {
    return this.chatService.updateTitle(user.userId, sessionId, dto.title);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':sessionId')
  deleteSession(
    @CurrentUser() user: { userId: string },
    @Param('sessionId') sessionId: string,
  ) {
    return this.chatService.deleteSession(user.userId, sessionId);
  }
}