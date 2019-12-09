import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { ResultProfile } from 'src/app/interface/interface.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() following: boolean;
  @Input() userClicked;
  @Output() toggleFollow = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService, private router: Router) {  
  }

  ngOnInit() {
  }

  followUser() {        
    if (this.following == false) {
      this.sharedService.followUser(this.userClicked).subscribe((result: ResultProfile) => {
        // console.log(result);
        this.toggleFollow.emit(true);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    } else {
      this.sharedService.unfollowUser(this.userClicked).subscribe((result: ResultProfile) => {
        // console.log(result);
        this.toggleFollow.emit(false);
      }, err => {
        console.log(err);
        this.router.navigate(['login']);
      });
    }

  }

}
