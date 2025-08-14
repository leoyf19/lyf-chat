import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class ChatService {
  private users: Record<string, User> = {};

  userConected(user: User) {
    this.users[user.id] = user;
  }

  userDisconnect(id: string) {
    delete this.users[id];
  }

  getUsers() {
    return Object.values(this.users);
  }
}
