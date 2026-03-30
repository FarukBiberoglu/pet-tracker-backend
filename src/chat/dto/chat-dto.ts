import { IsString, IsOptional } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class UpdateChatTitleDto {
  @IsString()
  title: string;
}