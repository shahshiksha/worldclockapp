import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResolver } from './user.resolver';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimezoneService } from './timezone.service';
import { DashboardService } from './dashboard.service';
import { AddmemeberComponent } from './addmemeber/addmemeber.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    AddmemeberComponent,
    SignUpComponent,
    ResponseResetComponent,
    RequestResetComponent,
    AnalogClockComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireStorageModule

  ],
  providers: [TimezoneService,DashboardService, AuthService, UserService, UserResolver, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
