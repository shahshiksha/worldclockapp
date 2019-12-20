import { Component, OnInit, AfterViewInit, Input} from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  template: `
    <div class="clock">
      <div class="analog-clock">
        <div class="hour hand" [ngStyle]="hourHandStyle"></div>
        <div class="minute hand" [ngStyle]="minuteHandStyle"></div>
        <div class="second hand" [ngStyle]="secondHandStyle"></div>
        <div class="center-circle"></div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');
	
	
	.clock {
  border-radius: 50%;
 // background-size: 88%;
  //height: 20em;
 // padding-bottom: 31%;
  position: relative;
 // width: 20em;
}

.clock.simple:after {
  background: #000;
  border-radius: 50%;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5%;
  height: 5%;
  z-index: 10;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

    .analog-clock {
      position: relative;
      margin: 0px auto 0;
      width: 70px;
      height: 70px;
	  background: #fff url(/assets/img/ios_clock.svg) no-repeat center;
      background-color: #bae2f6;
      border-radius: 60%;
    }

    .hand {
       position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
    }

    .hour {
  //    background-color: #f44336;
	 
  background: #000;
  height: 20%;
  left: 48.75%;
  position: absolute;
  top: 30%;
  transform-origin: 50% 100%;
  width: 2.5%;

    }

    .minute {
    //  background-color: #3f51b5;
	  
  background: #000;
  height: 40%;
  left: 49%;
  position: absolute;
  top: 10%;
  transform-origin: 50% 100%;
  width: 2%;

    }

    .second {
     // background-color: #9e9e9e;
	  background: #dc0000;
  height: 45%;
  left: 49.5%;
  position: absolute;
  top: 14%;
  transform-origin: 50% 80%;
  width: 1%;
  z-index: 8;
    }

    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }

    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
  `]
})
export class AnalogClockComponent implements AfterViewInit {
  @Input() currentDateTime;
  hourHandStyle; 
  minuteHandStyle; 
  secondHandStyle; 

  isRunning = true;
  timerId: any;

  date: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  ngAfterViewInit() {
    this.timerId = this.getTime();
  }

  animateAnalogClock() {
    this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)` };
    
    this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)` };
    
    this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)` };
  }

  getTime() {
    return setInterval(() => {

      this.date = new Date(this.currentDateTime);//new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      this.animateAnalogClock();
    }, 1000);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  toggle() {
    if (this.isRunning) {
      clearInterval(this.timerId);
    } else { this.getTime(); }

    this.isRunning = !this.isRunning;
  }
}


 