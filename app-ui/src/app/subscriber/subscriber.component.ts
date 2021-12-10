import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import CONSTANTS, { SUBSCRIBER_MAPPING } from '../common.constants';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements OnInit, OnDestroy {
  topics = CONSTANTS.channels;
  partitions = CONSTANTS.partitions;
  subscriberMap = SUBSCRIBER_MAPPING;

  topicFormControl = new FormControl(this.topics[0]);
  partitionFormControl = new FormControl(this.partitions[0]);

  subscriberUrlFormControl = new FormControl(
    this.subscriberMap['Subscriber 1']
  );

  isSubscribing = false;

  subscriber: any;

  newsList: any[] = [];

  selectedTopics: { topic: string; partition: number }[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {}

  toogleSubscribe() {
    if (this.selectedTopics.length) {
      if (!this.isSubscribing) {
        this.newsList = []
        this.subscriber = this.webSocketService
          .listen(
            this.selectedTopics,
            this.subscriberUrlFormControl.value
          )
          .subscribe((data) => {
            console.log(data)
            this.newsList = [JSON.parse(data as string), ...this.newsList];
          });
        this.webSocketService
          .listenOnce(this.topicFormControl.value)
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

  add() {
    if (
      !this.selectedTopics.find(
        ({ topic, partition }) =>
          topic === this.topicFormControl.value &&
          partition === this.partitionFormControl.value
      )
    ) {
      this.selectedTopics.push({
        topic: this.topicFormControl.value,
        partition: this.partitionFormControl.value,
      });
    }
  }

  remove(index: number) {
    this.selectedTopics = this.selectedTopics.filter((elem, i) => index != i);
  }
}
