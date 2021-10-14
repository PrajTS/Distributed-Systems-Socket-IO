import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements OnInit, OnDestroy {
  searchFormControl = new FormControl('');

  newsList: any[] = [];

  constructor(
    private api: ApiService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {}

  searchNews() {
    this.api.searchNews(this.searchFormControl.value).subscribe((data) => {
      this.newsList = (data as any).articles as any[];
    });
  }

  publishToServer(channel: string, news: any[]) {
    this.webSocketService.emit(channel, JSON.stringify(news));
  }

  ngOnDestroy() {}
}
