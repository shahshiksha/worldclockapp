import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, retry, catchError } from 'rxjs/operators';
// import { headersToString } from 'selenium-webdriver/http';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  API_KEY = 'Y18UCBMXO7AK';
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) { 
   // this.listTimeZone();
  }
  public listTimeZone(varCityName: string){
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin','http://localhost:4200');

  //  this.headers: {'Access-Control-Allow-Oigin':'*'};
  //   this.headers.set('Access-Control-Allow-Oigin','*');
    // return this.httpClient.get('http://api.timezonedb.com/v2.1/list-time-zone?key=Y18UCBMXO7AK&format=json')
    const url = 'http://vip.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=city&city='+varCityName.trim()+'&country=US'
    //return this.httpClient.get('http://api.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=zone&zone=Asia/Taipei&time=1575977993')
        return this.httpClient.get(url)
     .pipe(map(this.extractData));
  }

  public getTimeZone(timeZone: string){
    let params = new HttpParams()
                .set('zone', timeZone)
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin','http://localhost:4200');
    
    console.log('In ApiService : getTimeZone() : params = ' + params);

    // httpOptions.headers.append('Access-Control-Allow-Origin', "*" );
    // httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    // return this.httpClient.get('http://api.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=zone&zone=America/Chicago')//,{headers}
    // return this.httpClient.get('http://api.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=zone&zone=America/Chicago')
    
    return this.httpClient.get('http://api.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=zone')
    .pipe(map(this.extractDataGetTimeZone));
  }
  public getCurrentTime(timeZone: string){
    let params = new HttpParams()
                .set('zone', timeZone)
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin','http://localhost:4200');
    
    console.log('In ApiService : getTimeZone() : params = ' + params);
return this.httpClient.get('http://api.timezonedb.com/v2.1/get-time-zone?key=Y18UCBMXO7AK&format=json&by=zone')
    .pipe(map(this.extractDataGetTimeZone));
  }

//   {
//     "/api.timezonedb.com/*": {
//         "target": "http://localhost:4200",
//         "secure": false
//         "changeOrigin": true
//     }
// }

  private extractData(res: Response) {
    console.log('In timezonservice : extractData : Response');
    console.log(res)
    let body = res;
    return body || { };
  }

  private extractDataGetTimeZone(res: Response) {
    console.log('In timezonservice : extractDataGetTimeZone : Response = ' + res);
    let body = res;
    return body || { };
  }
}


