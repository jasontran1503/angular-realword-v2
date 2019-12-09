import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getTags() {
    return this.httpClient.get(`${this.link}tags`);
  }
}
