import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const { username } = client.handshake.auth;

    if (
      this.chatService.getUsers().some((user) => user.username === username)
    ) {
      client.emit('already_connect', {
        message: 'Usuario ya esta conectado',
      });
    }

    client.join(username);

    this.chatService.userConected({ id: client.id, username });

    this.server.emit('users-connect', this.chatService.getUsers());
  }

  handleDisconnect(client: Socket) {
    this.chatService.userDisconnect(client.id);

    this.server.emit('users-connect', this.chatService.getUsers());
  }

  @SubscribeMessage('send-message')
  handleSendMessage(
    @MessageBody() payload: { roomId: string; message: Message },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(payload.roomId).emit('new-message', payload);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { to: string; from: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Escribiendo');
    this.server.to(data.to).emit('typing', data);
  }
}
