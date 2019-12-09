import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ProfileService } from './profile.service';
import { ResultProfile, Profile, ResultUser } from '../interface/interface.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userNameClicked: string;
  userProfile: Profile;
  following: boolean = false;
  checkArticles = 1;
  currentUserName: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private sharedService: SharedService, private profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userNameClicked = params.name;
      this.getProfile();
    }, err => {
      console.log(err);
    });
    this.getCurrentUser();
    // this.currentUserName = this.sharedService.getCurrentUserNameImg().userName;
  }

  getCurrentUser() {
    this.sharedService.getCurrentUser().subscribe((result: ResultUser) => {
      this.currentUserName = result.user.username;
    })
  }

  onFollow(following: boolean) {
    this.following = following;
  }

  getProfile() {
    this.profileService.getProfile(this.userNameClicked).subscribe((result: ResultProfile) => {
      // console.log(result);
      this.userProfile = result.profile;
      this.following = result.profile.following;
    }, err => {
      console.log(err);
    });
  }

  showMyArticles() {
    this.checkArticles = 1;
  }

  showFavoritedArticles() {
    this.checkArticles = 2;
  }

}
