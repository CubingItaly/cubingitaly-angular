import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { MatSlideToggleChange } from '@angular/material';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'manage-competition',
  templateUrl: './manage-competition.component.html',
  styleUrls: ['./manage-competition.component.css']
})
export class ManageCompetitionComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Output() competitionChange: EventEmitter<CompetitionModel> = new EventEmitter<CompetitionModel>();
  @Input() registration: RegistrationModel;
  @Input() schedule: ScheduleModel[];
  @Input() directions: DirectionsModel[];

  constructor(private compSVC: CompetitionEditService) { }

  ngOnInit() {
  }

  deleteCompetition() {

  }

  officialSlider(event: MatSlideToggleChange) {
    this.competition.isOfficial = event.checked;
    this.adminUpdateCompetition();
  }

  hiddenSlider(event: MatSlideToggleChange) {
    this.competition.isHidden = event.checked;
    this.adminUpdateCompetition();
  }

  private adminUpdateCompetition() {
    this.compSVC.adminUpdateCompetition(this.competition).subscribe((res: CompetitionModel) => this.competitionChange.emit(res));
  }

}
