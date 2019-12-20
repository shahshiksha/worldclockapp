import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  errorMessage: string = '';


  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.tryLogout()
   
  }
  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
