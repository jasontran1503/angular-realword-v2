import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getCurrentUser() {
    return this.httpClient.get(`${this.link}user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  updateUser(imgURL, userName, bio, email, password) {
    return this.httpClient.put(`${this.link}user`, {
      "user": {
        "email": email,
        "bio": bio,
        "image": imgURL,
        "username": userName,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }
}
