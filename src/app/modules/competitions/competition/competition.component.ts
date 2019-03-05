import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition: CompetitionModel;
  registration: RegistrationModel;
  directions: DirectionsModel[];
  schedule: ScheduleModel[];

  constructor(private compSVC: CompetitionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let compId: string = this.activatedRoute.snapshot.paramMap.get("id");
    this.compSVC.getCompetition(compId).subscribe((res: CompetitionModel) => this.competition = res);
    this.compSVC.getRegistration(compId).subscribe((res: RegistrationModel) => this.registration = res);
    this.compSVC.getDirections(compId).subscribe((res: DirectionsModel[]) => this.directions = res);
    this.compSVC.getSchedule(compId).subscribe((res: ScheduleModel[]) => this.schedule = res);
  }

}
