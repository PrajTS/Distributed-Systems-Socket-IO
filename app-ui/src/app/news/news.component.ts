import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import CONSTANTS from '../common.constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';
  @Input() image: string = '';
  @Input() publisherId = '';
  @Input() isPublisher: boolean = false;
  @Output() publishEV = new EventEmitter<any>();

  channels = CONSTANTS.channels;
  partitions = CONSTANTS.partitions;

  channelFormControl = new FormControl(this.channels[0]);
  partitionFormControl = new FormControl(this.partitions[0]);

  constructor() {}

  ngOnInit(): void {}

  publish(channel: string, partition: number) {
    console.log(channel, partition)
    this.publishEV.emit({ channel, partition });
  }
}
