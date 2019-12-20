import { Injectable } from '@angular/core';
import { Timezone } from './timezone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  // Define API
  apiURL = 'http://api.timezonedb.com/v2.1/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getTimeZoneDB(): Observable<any> {
    console.log('In timezon service : getTimeZoneDB')
    return this.http.get(this.apiURL + '/list-time-zone?key=Y18UCBMXO7AK&format=json&country=NZ')
    .pipe(map(this.extractData)
      //retry(1),
      //catchError()
      //catchError(this.handleError<any>('getTimeZoneDB'))
    );
  }

  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    console.log('In timezonservice : extractData : Response = ' + res);
    let body = res;
    return body || { };
  }

  getTimezone(): Timezone[]
  {
    return[
      new Timezone(1, "CST"),
      new Timezone(1, "PST"),
      new Timezone(1, "EST")




    ];
  }
}
