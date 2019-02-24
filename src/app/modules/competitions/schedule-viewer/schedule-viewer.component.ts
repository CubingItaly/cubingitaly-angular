import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';

@Component({
  selector: 'schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css']
})
export class ScheduleViewerComponent implements OnInit {

  @Input() schedule: ScheduleModel;

  constructor() { }

  ngOnInit() {
  }

  capitalize(dateString: string) {
    return dateString[0].toUpperCase() + dateString.substr(1);
  }

}
