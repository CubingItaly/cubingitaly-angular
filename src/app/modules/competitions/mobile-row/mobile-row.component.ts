import { Component, OnInit, Input } from '@angular/core';
import { ScheduleRowModel } from '../../../models/competition/schedule.row.model';

@Component({
  selector: 'mobile-row',
  templateUrl: './mobile-row.component.html',
  styleUrls: ['./mobile-row.component.css']
})
export class MobileRowComponent implements OnInit {


  @Input() row: ScheduleRowModel;
  isEvent: boolean = false;
  hidden: boolean = true;

  constructor() { }

  ngOnInit() {
    if(this.row.eventId!=="other"){
      this.isEvent=true;
    }
  }

  clicked() {
    if (this.isEvent) {
      this.hidden = !this.hidden;
    }
  }

}
