import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';

@Component({
  selector: 'schedule-info',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: ScheduleModel[]

  constructor() { }

  ngOnInit() {
  }

}
