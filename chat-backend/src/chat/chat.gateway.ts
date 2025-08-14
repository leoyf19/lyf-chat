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
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const { username } = client.handshake.auth;

    this.chatService.userConected({ id: client.id, username });

    this.server.emit('users-connect', this.chatService.getUsers());
  }

  handleDisconnect(client: Socket) {
    this.chatService.userDisconnect(client.id);

    this.server.emit('users-connect', this.chatService.getUsers());
  }
}
