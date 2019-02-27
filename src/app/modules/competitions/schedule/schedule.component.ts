import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'schedule-info',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: ScheduleModel[];

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() { }

  capitalize(dateString: string) {
    return dateString[0].toUpperCase() + dateString.substr(1);
  }

}
