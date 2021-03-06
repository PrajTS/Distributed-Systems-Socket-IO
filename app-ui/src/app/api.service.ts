import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchNews(query: string) {
    return this.http.get(`/api/search?q=${query}`);
  }
}
