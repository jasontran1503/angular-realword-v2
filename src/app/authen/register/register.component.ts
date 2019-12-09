import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../authen.service';
import { ResultUser } from 'src/app/interface/interface.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSignUp: FormGroup;
  errors;
  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private router: Router, private authenService: AuthenService) { }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signUp() {
    let username = this.formSignUp.value.username;
    let email = this.formSignUp.value.email;
    let password = this.formSignUp.value.password;
    return this.authenService.registerUser(username, email, password).subscribe((result: ResultUser) => {
      console.log(result);
      if (result != null) {
        alert("Created account is completed!!!")
        this.router.navigate(['login']);
      }
    }, (err) => {
      this.errors = err.error.errors;
    })
  }

}
