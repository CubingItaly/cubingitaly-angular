import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
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
  compId: string

  constructor(private compSVC: CompetitionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.compId = this.route.snapshot.paramMap.get("id");
    this.compSVC.getCompetition(this.compId).subscribe((res: CompetitionModel) => this.competition = res);
    this.compSVC.getRegistration(this.compId).subscribe((res: RegistrationModel) => this.registration = res);
    this.compSVC.getDirections(this.compId).subscribe((res: DirectionsModel[]) => this.directions = res);
    this.compSVC.getSchedule(this.compId).subscribe((res: ScheduleModel[]) => this.schedule = res);
  }

}
