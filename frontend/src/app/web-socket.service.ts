import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;
  readonly uri = 'ws://localhost:3000';
  clientId: string = '';

  constructor() {
    this.socket = io(this.uri);
    this.clientId = "" + Math.floor(1000 + Math.random() * 9000);
  }



  listen(channel: string) {
    this.emit('__join__', channel);
    return new Observable((subscriber) => {
      this.socket.on(channel, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenOnce() {
    return new Observable((subscriber) => {
      this.socket.once('__welcome__', (data: string) => {
        subscriber.next(JSON.parse(data));
      });
    });
  }

  stopListening(channel?: string) {
    this.socket.off();
  }

  emit(channel: string, message: string) {
    this.socket.emit(channel, message, this.clientId);
  }
}
