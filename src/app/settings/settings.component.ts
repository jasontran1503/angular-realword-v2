import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User, ResultUser } from '../interface/interface.component';
import { Router } from '@angular/router';
import { AuthenService } from '../authen/authen.service';
import { SettingsService } from './settings.service';
import { HeaderService } from '../shared/layout/header/header.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  formSettings: FormGroup;
  errors;
  token: string;
  currentUser: User;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder,
    private router: Router, private authenService: AuthenService, private settingsService: SettingsService,
    public headerService: HeaderService) { }

  ngOnInit() {
    this.formSettings = this.fb.group({
      imgURL: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.token = localStorage.getItem('api_token');
    this.settingsService.getCurrentUser().subscribe((result: ResultUser) => {
      // console.log(result);
      this.currentUser = result.user;
      this.formSettings.setValue({
        imgURL: this.currentUser.image,
        userName: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: this.formSettings.value.password,
      });
    });
  }

  updateUser() {
    let imgURL = this.formSettings.value.imgURL;
    let userName = this.formSettings.value.userName;
    let bio = this.formSettings.value.bio;
    let email = this.formSettings.value.email;
    let password = this.formSettings.value.password;
    return this.settingsService.updateUser(imgURL, userName, bio, email, password).subscribe((result: ResultUser) => {
      // console.log(result);
      this.headerService.next(result.user.username, result.user.image);
      this.router.navigate(['/', 'profile', userName]);
    }, (err) => {
      console.log(err);
      this.errors = err.error.errors;
    })
  }

  logOut() {
    localStorage.removeItem('api_token');
    // this.userService.setCurrentUserName('');
    // this.userService.getCurrentUserName();
    this.authenService.logOut();
    confirm("Are you sure you want to log out???");
    this.router.navigate(['home']);
  }

}
