import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import CONSTANTS from './common.constants';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;
  readonly uri = 'ws://localhost:3000';
  clientId: string = '';
  subscriberUrl = '';

  constructor() {
    this.clientId = '' + Math.floor(1000 + Math.random() * 9000);
  }

  connect(channel?: string, current = -1, left = CONSTANTS.channels.length - 1) {
    const uri = this.subscriberUrl;
    try {
      this.socket = io(uri);
    } catch (e) {
      // this.rendezvous(channel, current, left);
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

  listen(selectedChannels: any[], subscriberUrl: string, ) {
    this.subscriberUrl = subscriberUrl;
    this.connect();
    this.socket.on('connect', () => {
      this.socket.emit('__join__', selectedChannels, this.clientId);
    });
    return new Observable((subscriber) => {
      this.socket.on(this.clientId, (data: any) => {
        console.log(data)
        subscriber.next(data.value);
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
