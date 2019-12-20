import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      AcceptTermsAndCondition:  [null, Validators.requiredTrue]
      // AcceptTermsAndCondition:  [false, Validators.pattern('true')] 
     });
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  trySignUp(value){
    console.log('In trysignUp');
    this.authService.doSignUp(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}