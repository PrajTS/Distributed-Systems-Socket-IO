import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { CHANNEL_PORT_MAPPING } from './common.constants';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;
  readonly uri = 'ws://localhost:3000';
  clientId: string = '';

  constructor() {
    this.clientId = '' + Math.floor(1000 + Math.random() * 9000);
  }

  connect(channel?: string) {
    const uri = (channel && (CHANNEL_PORT_MAPPING as any)[channel]) || this.uri;
    console.log(uri, channel);
    this.socket = io(uri);
  }

  listen(channel: string) {
    this.connect(channel);
    this.socket.on('connect', () => {
      this.socket.emit('__join__', channel, this.clientId);
    });
    return new Observable((subscriber) => {
      this.socket.on(channel, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenOnce(channel: string) {
    return new Observable((subscriber) => {
      this.socket.once('__welcome__', (data: string) => {
        subscriber.next(JSON.parse(data));
      });
    });
  }

  stopListening(channel?: string) {
    this.socket.off();
    this.socket.close();
  }

  emit(channel: string, message: string) {
    if (channel !== '__join__') {
      this.connect(channel);
    }
    this.socket.on('connect', () => {
      this.socket.emit(channel, message, this.clientId);
      this.socket.close();
    });
  }
}
