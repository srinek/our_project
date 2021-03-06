import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.css']
})
export class BusinessHoursComponent implements OnInit, OnChanges {

  @Input() startTime : Date;
  @Input() endTime : Date;
  @Input() busHours : Array<{day:number, endTime?:string, startTime?:string}> = [];
  onBeginClosed = new EventEmitter<number>();
  onEndClosed = new EventEmitter<number>();
  @Output() onBeginTimeSelected = new EventEmitter<{dayInWeek:number, beginTime:string}>();
  @Output() onEndTimeSelected = new EventEmitter<{dayInWeek:number, endTime:string}>();
  public beginItems:Array<string> = [];
  public endItems:Array<string> = [];
  public weekdays : Array<{day:string, dayInWeek:number}> = [ {day :"Sun", dayInWeek:1}, {day :"Mon", dayInWeek:2}, 
                    {day :"Tue", dayInWeek:3}, {day :"Wed", dayInWeek:4}, {day :"Thu", dayInWeek:5}, {day :"Fri", dayInWeek:6}, 
                    {day :"Sat", dayInWeek:7}]; 
  private disabled : boolean = false;
  private activeBeginItems : Map<number, Array<{id:string, text:string}>> = new Map();
  private activeEndItems : Map<number, Array<{id:string, text:string}>> = new Map();
  

  constructor() { }

  ngOnInit() {
    let newTime = this.startTime;
    this.beginItems.push("");
    this.beginItems.push("Closed");
    this.beginItems.push(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    this.endItems.unshift(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    while(newTime.getTime() < this.endTime.getTime()){
      newTime.setMinutes(newTime.getMinutes() + 15);
      this.beginItems.push(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
      this.endItems.unshift(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    }

    this.weekdays.forEach((eachDay) => {
       this.activeBeginItems.set(eachDay.dayInWeek, this.getActiveBeginItems(eachDay.dayInWeek));
       this.activeEndItems.set(eachDay.dayInWeek, this.getActiveEndItems(eachDay.dayInWeek));
    });

    this.endItems.unshift("Closed");
    this.endItems.unshift("");
    console.log("business hours ", this.busHours)
  }

  ngOnChanges(changes : {busHours : SimpleChange}){
    console.log("", changes.busHours);
    this.busHours = changes.busHours.currentValue;
    if(this.busHours.length > 0){
      this.weekdays.push({day :"Nan", dayInWeek:1});
    }
    //console.log("", changes.staff.currentValue);
    
  }

  getActiveBeginItems(weekday : number){
    //console.log("@@@@@ active  BEGIN item called", weekday, this.beginCount++);
    let matchedBusHour = this.busHours.find( (busHour) => {
         return busHour.day  === weekday;
    });
    if(matchedBusHour){
      return [{"id":matchedBusHour.startTime, "text":matchedBusHour.startTime}];
    }
    return [{"id":"", "text":""}];
  }

  getActiveEndItems(weekday : number){
    //console.log("**** active  END item called", weekday);
    let matchedBusHour = this.busHours.find( (busHour) => {
         return busHour.day  === weekday;
    });
    if(matchedBusHour){
      return [{"id":matchedBusHour.endTime, "text":matchedBusHour.endTime}];
    }
    return [{"id":"", "text":""}];
  }

  toggleDisabled(){
    this.disabled = !this.disabled;
    console.log("diabled called ", this.disabled);
  }

  beginTimeSelected(beginTime, day){
     console.log("begin time %j ", beginTime.text);
     console.log("day %j ", day);
     this.onBeginTimeSelected.emit({dayInWeek:day, beginTime:beginTime.text});
     if(beginTime.text === "Closed"){
       this.onBeginClosed.emit(day);
     }
  }

  endTimeSelected(endTime, day){
    console.log("end time %j ", endTime.text);
    console.log("day %j ", day);
    this.onEndTimeSelected.emit({dayInWeek:day, endTime:endTime.text});
    if(endTime.text === "Closed"){
      this.onEndClosed.emit(day);
    }
 }

 closeBegin(dayInWeek, beginRef){
    console.log("beginRef", beginRef );
    //set activeItems here
 }

 closeEnd(dayInWeek, beginRef){
    console.log("beginRef", beginRef );
 }

}
