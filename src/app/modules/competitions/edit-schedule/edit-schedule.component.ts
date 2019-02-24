import { Component, OnInit, Input } from '@angular/core';
import { WCAService } from 'src/app/services/wca.service';
import { CompetitionService } from '../services/competition.service';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';

@Component({
  selector: 'edit-schedule-info',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  @Input() competitionId: string;
  constructor(private compSVC: CompetitionService) { }
  schedule: ScheduleModel[];

  ngOnInit() {
    this.compSVC.getSchedule(this.competitionId).subscribe((res: ScheduleModel[]) => {
      this.schedule = res;
    });
  }

  importSchedule() {
    this.compSVC.importSchedule(this.competitionId);
  }

}
