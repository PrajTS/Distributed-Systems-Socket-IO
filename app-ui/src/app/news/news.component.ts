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
  @Output() publishEV = new EventEmitter<string>();

  channels = CONSTANTS.channels;

  channelFormControl = new FormControl(this.channels[0]);

  constructor() {}

  ngOnInit(): void {}

  publish(channel: string) {
    this.publishEV.emit(channel);
  }
}
