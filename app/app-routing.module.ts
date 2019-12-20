import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddmemeberComponent } from './addmemeber/addmemeber.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RequestResetComponent} from './request-reset/request-reset.component';
import { ResponseResetComponent} from './response-reset/response-reset.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent}, //canActivate: [AuthGuard]},
  { path: 'sign-up', component: SignUpComponent},//, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent},//canActivate: [AuthGuard]}, // canActivate, RouteGuardService
  { path: 'addmemeber', component: AddmemeberComponent},// canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  {path: 'request-reset-password',component: RequestResetComponent},
  // {path: 'response-reset-password/:token',component: ResponseResetComponent},
  {path: 'response-reset-password',component: ResponseResetComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
