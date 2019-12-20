// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-request-reset',
//   templateUrl: './request-reset.component.html',
//   styleUrls: ['./request-reset.component.scss']
// })
// export class RequestResetComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IssubmittedForm = true;
showWaitMessage = "Please wait we are resetting your password";
constructor(
  private authService: AuthService,
  private router: Router,
 ) {

}


ngOnInit() {
  //this.successMessage = this.showWaitMessage;
  this.IssubmittedForm = false;
  this.successMessage = null;


  this.RequestResetForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
  });
}


RequestResetUser(form) {
  console.log('In request reset component : ' + form)
  if (form.valid) {
    this.IssubmittedForm = true;
    //this.authService.requestReset(this.RequestResetForm.value).subscribe(
      //data => {
        this.successMessage = "Reset password link send to email sucessfully.";
        setTimeout(() => {
          this.successMessage = null;
          this.IssubmittedForm = false;
          this.RequestResetForm.reset();
          this.router.navigate(['login']);
        }, 2000);
    //   },
    //   err => {
    //     //this.successMessage = this.showWaitMessage;


    //     if (err.error.message) {
    //       this.errorMessage = err.error.message;
    //     }
    //   }
    // );
  } else {
    this.IssubmittedForm = false;
  }
}
}