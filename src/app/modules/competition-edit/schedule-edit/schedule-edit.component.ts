import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'edit-schedule-info',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {

  @Input() competitionId: string;
  constructor(private compSVC: CompetitionEditService) { }
  schedule

  ngOnInit() {
    this.compSVC.getSchedule(this.competitionId).subscribe((res: ScheduleModel[]) => {
      this.schedule = res;
    });
  }

  importSchedule() {
    this.compSVC.importSchedule(this.competitionId);
  }


}
