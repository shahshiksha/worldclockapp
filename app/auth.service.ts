import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';
// import 'rxjs/add/operator/toPromise';
import { catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

// const BASEURL = 'http://localhost:3000/api/resetpassword';
const BASEURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public static currentUser=null;

  constructor( private afAuth: AngularFireAuth,private http: HttpClient,
    private db: AngularFireDatabase, private router: Router) {
      
     }
  resetPassword(email: string){
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error))
  }

  doSignUp(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        AuthService.currentUser=res;
      

      }, err => reject(err))
    })

    }
    doLogin(value){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          if(res){
            AuthService.currentUser=value.email;
        console.log(AuthService.currentUser);
          resolve(res);

          }
          
          
        }, err => reject(err))
      })
    }
  
    doLogout(){
      return new Promise((resolve, reject) => {
        if(firebase.auth().currentUser){
          this.afAuth.auth.signOut();
          AuthService.currentUser=null;

          resolve();
        }
        else{
          reject();
        }
      });
    }
    
    requestReset(body): Observable<any> {
      let headers = new HttpHeaders().set('Access-Control-Allow-Origin','http://localhost:4200');
      headers.append('Content-Type','application/json');

      console.log('body = ' + body);
      console.log('body email = ' + body.email);
      
      return this.http.post(`${BASEURL}/sendmail`, {headers,withCredentials: false,},body);
    }
  
    newPassword(body): Observable<any> {
      return this.http.post(`${BASEURL}/new-password`, body);
    }
  
    ValidPasswordToken(body): Observable<any> {
      return this.http.post(`${BASEURL}/valid-password-token`,  body);
    }
  
  }
 
