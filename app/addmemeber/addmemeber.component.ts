import { Component, OnInit } from '@angular/core';
import { TimezoneService } from '../timezone.service';
import { Timezone } from '../timezone';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { fromEvent, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AuthService } from '../auth.service';






@Component({
  selector: 'app-addmemeber',
  templateUrl: './addmemeber.component.html',
  styleUrls: ['./addmemeber.component.scss']
})
export class AddmemeberComponent implements OnInit {
  imgSrc: string = '/assets/img/team-member-icon.png';
  selectedImage: any = null;
  timezone: Timezone[] = []
  teammemberName: string;
  TimeZone: string;
  CurrentTime: number;
  imageUrl: string;
  timeZoneList: string[] = [];
  timeZoneStr: string;
  formattedTime: string;
  cityName: string;
  //image: string;

  constructor(private timezoneService: TimezoneService,
    private crudService: CrudService,
    private router: Router,
    private apiService: ApiService,

  ) { }

  ngOnInit() {
    //this.timezone = this.timezoneService.getTimezone(); 
  }

  getCurrentTime(event: any) {
    this.apiService.listTimeZone(event.target.value).subscribe((data: any) => {
      this.timeZoneStr = data.zones[0]["abbreviation"];
      this.formattedTime = data.zones[0]['formatted'] + ' (' + this.timeZoneStr + ')'; //"2019-12-12 18:07:12"

      // this.timeZoneList.push(this.timeZoneStr);

    });


  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/team-member-icon.png';
      this.selectedImage = null;
    }

  }
  CreateRecord() {
    let record = {};
    debugger
    record['MemberName'] = this.teammemberName;
    //record['TimeZone'] = this.timeZoneStr;
    record['cityName'] = this.cityName;
    record['imageUrl'] = this.imageUrl ? this.imageUrl : null;
    record['createdBy']=  AuthService.currentUser;
    this.crudService.create_NewMember(record).then(resp => {
      this.teammemberName = "";
      //this.TimeZone = "";
      this.formattedTime = undefined;
      this.imageUrl = undefined;
      this.router.navigate(['/dashboard']);

      //console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });

  }
  onUploadImage(event) {
    if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      let imageToUpload = event.target.files.item(0);
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          this.imageUrl = base64image;
          // do something with base64 image..
        });
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

}
