import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ResultTag } from '../interface/interface.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tagList: string[];
  token: string;
  checkFeed = 2;
  tag;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('api_token');
    this.getTags();
  }

  getTags() {
    this.homeService.getTags().subscribe((result: ResultTag) => {
      // console.log(result);
      this.tagList = result.tags;
    }, err => {
      // console.log(err);
      this.router.navigate(['login']);
    });
  }

  showYourFeed() {
    this.checkFeed = 1;
  }

  showGlobalFeed() {
    this.checkFeed = 2;
  }

  showTagFeed(tag) {
    this.checkFeed = 3;
    this.tag = tag;
  }

}
