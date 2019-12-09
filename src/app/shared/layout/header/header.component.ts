import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/authen/authen.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { SharedService } from '../../shared.service';
import { ResultUser, User } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUserName;
  currentUserImage;
  token: string;
  user: User;

  constructor(private headerService: HeaderService, private router: Router, public authenService: AuthenService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.token = localStorage.getItem('api_token');
    this.getCurrentUser();

    this.headerService.subject.subscribe((result) => {
      this.currentUserName = result['name'];
      this.currentUserImage = result['image'];
      this.sharedService.setCurrentUserNameImg({userName: this.currentUserName,image: this.currentUserImage});
    });
  }

  getCurrentUser() {
    this.sharedService.getCurrentUser().subscribe((result: ResultUser) => {
      this.user = result.user;
      this.currentUserName = result.user.username;
      this.currentUserImage = result.user.image;
    })
  }

}
