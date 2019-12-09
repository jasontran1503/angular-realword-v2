import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      }
      );
    }
    return this.httpClient.get(`${this.link}articles/${slug}`);
  }

  deleteArticle(slug) {
    return this.httpClient.delete(`${this.link}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  getComments(slug) {
    return this.httpClient.get(`${this.link}articles/${slug}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  addComments(slug, body) {
    return this.httpClient.post(`${this.link}articles/${slug}/comments`, {
      "comment": {
        "body": body
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  deleteComment(slug, id) {
    return this.httpClient.delete(`${this.link}articles/${slug}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

}
