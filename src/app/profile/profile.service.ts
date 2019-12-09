import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getProfile(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}profiles/${userName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      }
      );
    }
    return this.httpClient.get(`${this.link}profiles/${userName}`);
  }
}
