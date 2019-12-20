import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FirebaseUserModel } from '../user.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { ApiService } from '../api.service';
import { TimezoneService } from '../timezone.service';
import { Timezone } from '../timezone';
import { pluck } from 'rxjs/operators';
import { fromEvent, Observable, forkJoin } from 'rxjs';
import { resolve } from 'url';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashboardAuthService = AuthService;
  imageUrl: string = '/assets/img/team-member-icon.png';
  img: string = '/assets/img/clock.png';
  times;
  dashboard: FirebaseUserModel = new FirebaseUserModel
  TeamMembersSummary = [];
  teammmember: any;
  teammemberName: string;
  formattedTime: string;
  timezone: Timezone[] = []
  timeZoneList: string[] = [];
  timeZoneStr: string;
  today: number = Date.now();
  teammmembersList = [];
  defaultImageUrl = 'data:image/png;base64,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';




  constructor(private dashboardService: DashboardService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private apiService: ApiService,
    private timezoneService: TimezoneService,

  ) { setInterval(() => { this.today = Date.now() }, 1); }

  ngOnInit() {
    this.loadTeammembers().then(() => {
      this.formatData();
    })


  }





  formatData() {
    let observables = new Array;
    for (let teammember of this.teammmembersList) {
      observables.push(this.apiService.listTimeZone(teammember.cityName));

    }
    forkJoin(observables).subscribe(
      (resp: any) => {
        debugger
        for (let i = 0; i < this.teammmembersList.length; i++) {
          let teammember = this.teammmembersList[i];
          let formattedTime = resp[i].zones[0]['formatted'];
          teammember.currentTime = new Date(formattedTime);
          teammember.currentTimeInMilliSec = teammember.currentTime.getTime();
          setInterval(() => {
            teammember.currentTime.setSeconds(teammember.currentTime.getSeconds() + 1);
            teammember.currentTimeInMilliSec = teammember.currentTimeInMilliSec + 1000;
            //console.log(teammember.currentTime);
          }, 1000);
          teammember.timeZone = resp[i].zones[0]["abbreviation"];
        }
        //console.log(resp);

      },
      error => {
        console.log('Error', error);
      }
    );

  }
  trackByCurrentTime(index: number, teammember: any) {
   // console.log(teammember.currentTime);
    //console.log("traackByCurrentTime");

    return teammember.currentTime;

  }
  formatDate() {



    return this.teammmembersList[0].currentTime;
  }
  loadTeammembers() {
    return new Promise((resolve) => {
      this.crudService.read_teammember().subscribe(data => {
        this.teammmembersList = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            MemberName: e.payload.doc.data()['MemberName'],
            cityName: e.payload.doc.data()['cityName'],
            formattedTime: null,
            timeZoneStr: null,
            imageUrl: e.payload.doc.data()['imageUrl'] ? e.payload.doc.data()['imageUrl'] : this.defaultImageUrl,
            createdBy: e.payload.doc.data()['createdBy']




          };
        })
        this.getformattedTimeByCityName(this.teammmembersList);

        console.log(this.teammmembersList);
        resolve();
      });
    });
  }


  RemoveRecord(record_id) {
    this.crudService.delete_teammember(record_id);
  }
  EditRecord(record) {
    record.isEdit = true;
    record.EditMemberName = record.MemberName;
    //record.EditTimeZone = record.TimeZone;
    record.EditformattedTime = record.formattedTime;
    record.EditimageUrl = record.imageUrl;

  }
  UpdateRecord(recordRow) {
    let record = {};
    record['MemberName'] = recordRow.EditMemberName;
    record['formattedTime'] = recordRow.EditformattedTime;
    record['imageUrl'] = recordRow.EditimageUrl;
    //console.log(record);
    this.crudService.update_teammember(recordRow.id, record).then(resp => {

      recordRow.isEdit = false;

     // console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  getListOfTimeZone(value) {
   // console.log('In getListOfTimeZone');
    this.timezoneService.getTimeZoneDB()

  }
  onUploadImage(event, record) {
    if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      let imageToUpload = event.target.files.item(0);
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          record.EditimageUrl = base64image;
          // do something with base64 image..
        });
    }
  }
  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }
  getformattedTimeByCityName(list: any) {
    for (let i = 0; i < list.size; i++) {
      this.apiService.listTimeZone(list[i].cityName).subscribe((data: any) => {
        list[i].timeZoneStr = data.zones[0]["abbreviation"];
        list[i].formattedTime = data.zones[0]['formatted'] + ' (' + data.zones[0]["abbreviation"] + ')'; //"2019-12-12 18:07:12"


      });
    }


  }
}



