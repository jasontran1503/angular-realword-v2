import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  link = 'https://conduit.productionready.io/api/';
  userName: string;
  image: string;

  constructor(private httpClient: HttpClient) { }

  getCurrentUser() {
    return this.httpClient.get(`${this.link}user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  setCurrentUserNameImg({ userName, image }) {
    this.userName = userName;
    this.image = image;
  }

  getCurrentUserNameImg() {
    return { userName: this.userName, image: this.image };
  }

  getArticles(type, tag, author, favorited, limit, offset) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.get(`${this.link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`);
  }

  followUser(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.post(`${this.link}profiles/${userName}/follow`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      })
    }
    return this.httpClient.post(`${this.link}profiles/${userName}/follow`, {});
  }

  unfollowUser(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.delete(`${this.link}profiles/${userName}/follow`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      })
    }
    return this.httpClient.delete(`${this.link}profiles/${userName}/follow`);
  }

  favoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.post(`${this.link}articles/${slug}/favorite`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.post(`${this.link}articles/${slug}/favorite`, {});
  }

  unfavoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.delete(`${this.link}articles/${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.delete(`${this.link}articles/${slug}/favorite`);
  }
}
