import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  // resetPassword(email: string){
  //   this.authService.resetPassword(email)
  // }

  constructor(public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
      this.loginForm = this.fb.group({
        email: ['', Validators.email ],
        password: ['',Validators.required]
      });
    }
    ngOnInit() {
    }

 
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
  tryLogout(value){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/logout']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
  resetPassword(email: string){
    console.log("In dashboard ts : this.resetPassword()");
    this.router.navigate(['/request-reset-password']);
    // this.authService.resetPassword(email)
  }
}