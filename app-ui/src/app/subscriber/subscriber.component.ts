import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import CONSTANTS from '../common.constants';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements OnInit, OnDestroy {
  channels = CONSTANTS.channels;
  channelFormControl = new FormControl(this.channels[0]);
  isSubscribing = false;

  subscriber: any;

  newsList: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {}

  toogleSubscribe() {
    if (this.channelFormControl.value) {
      if (!this.isSubscribing) {
        this.subscriber = this.webSocketService
          .listen(this.channelFormControl.value)
          .subscribe((data) => {
            this.newsList = [JSON.parse(data as string), ...this.newsList];
          });
        this.webSocketService
          .listenOnce()
          .subscribe((news) => (this.newsList = news as any[]));
      } else {
        this.webSocketService.stopListening();
        if (this.subscriber) {
          this.subscriber.unsubscribe();
        }
      }
      this.isSubscribing = !this.isSubscribing;
    }
  }

  ngOnDestroy() {
    this.webSocketService.stopListening();
  }
}
