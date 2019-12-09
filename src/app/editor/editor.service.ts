import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getArticle(slug: string) {
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

  createArticle(title, description, body, tagList) {
    return this.httpClient.post(`${this.link}articles`, {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  updateArticle(title, description, body, tagList, slug) {
    return this.httpClient.put(`${this.link}articles/${slug}`, {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }
}
