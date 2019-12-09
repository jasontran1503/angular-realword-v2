import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public isAuth = false;
  link = 'https://conduit.productionready.io/api/';
  currentUserName: string;

  constructor(private httpClient: HttpClient) { 
    if(localStorage.getItem('api_token')) {
      this.isAuth = true;
    }
  }

  logIn() {
    this.isAuth = true;
    return this.isAuth;
  }

  logOut() {
    this.isAuth = false;
    return this.isAuth;
  }

  logInUser(email, password) {
    return this.httpClient.post(`${this.link}users/login`, {
      "user": {
        "email": email,
        "password": password,
      }
    })
  }

  registerUser(username, email, password) {
    return this.httpClient.post(`${this.link}users`, {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    })
  }

  // setCurrentUserName(currentUserName) {
  //   this.currentUserName = currentUserName;
  // }

  // getCurrentUserName() {
  //   return this.currentUserName;
  // }

  // getCurrentUser() {
  //   return this.httpClient.get(`${this.link}user`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token ' + localStorage.getItem('api_token')
  //     }
  //   });
  // }

}
