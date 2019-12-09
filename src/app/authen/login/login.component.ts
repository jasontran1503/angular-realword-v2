import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../authen.service';
import { User, ResultUser } from 'src/app/interface/interface.component';
import { HeaderService } from 'src/app/shared/layout/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  errors;
  objectKeys = Object.keys;

  constructor(private router: Router, private fb: FormBuilder, private authenService: AuthenService,
    public headerService: HeaderService) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  logIn() {
    let email = this.formSignIn.value.email;
    let password = this.formSignIn.value.password;
    return this.authenService.logInUser(email, password).subscribe((result: ResultUser) => {
      // console.log(result);
      if (result != null) {
        this.authenService.logIn();
        localStorage.setItem('api_token', result.user.token);
        this.headerService.next(result.user.username, result.user.image);
        
        this.router.navigate(['home']);
      }
    }, (err) => {
      this.errors = err.error.errors;
      console.log(err);
    }); 
  }

}
