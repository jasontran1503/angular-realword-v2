import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public subject = new Subject();
  name: string;
  image: string;
  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  next(name: string, image: string) {
    this.name = name;
    this.image = image;
    this.subject.next({name: this.name, image: this.image});
  }

}
