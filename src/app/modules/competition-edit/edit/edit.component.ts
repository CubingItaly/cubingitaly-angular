import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionEditService } from '../services/competition-edit.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  competition: CompetitionModel;
  registration: RegistrationModel;
  directions: DirectionsModel[];
  schedule: ScheduleModel[];

  updated: boolean;
  initialTab: number = 0;


  constructor(private compSVC: CompetitionEditService, private route: ActivatedRoute) { }

  ngOnInit() {
    let compId: string = this.route.snapshot.paramMap.get("id");
    this.initialTab = Number(this.route.snapshot.queryParamMap.get("tab")) || 0;
    this.compSVC.getCompetition(compId).subscribe((res: CompetitionModel) => this.competition = res);
    this.compSVC.getRegistration(compId).subscribe((res: RegistrationModel) => this.registration = res);
    this.compSVC.getSchedule(compId).subscribe((res: ScheduleModel[]) => this.schedule = res);
    this.compSVC.getDirections(compId).subscribe((res: DirectionsModel[]) => this.directions = res);
  }

}
