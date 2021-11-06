import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import CONSTANTS, { CHANNEL_PORT_MAPPING } from './common.constants';

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

  connect(channel: string, current = -1, left = CONSTANTS.channels.length - 1) {
    const uri = (channel && (CHANNEL_PORT_MAPPING as any)[channel]) || this.uri;
    try {
      this.socket = io(uri);
    } catch (e) {
      this.rendezvous(channel, current, left);
    }
  }

  rendezvous(channel: string, current: number, left: number) {
    if (left > 0) {
      if (current === -1) {
        current = CONSTANTS.channels.indexOf(channel);
      }
      left--;
      current = (current + 1) % (CONSTANTS.channels.length - 1);

      this.connect(CONSTANTS.channels[current], current, left);
    }
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
