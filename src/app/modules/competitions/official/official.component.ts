import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css']
})
export class OfficialComponent implements OnInit {

  inProgress: CompetitionModel[];
  upcoming: CompetitionModel[];
  past: CompetitionModel[];

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
    let now: Date = new Date(new Date().toDateString());
    this.compSVC.getUpcomingCompetitions().subscribe((res: CompetitionModel[]) => this.upcoming = res);
    this.compSVC.getPastCompetitions().subscribe((res: CompetitionModel[]) => this.past = res);
    this.compSVC.getOnGoingCompetitions().subscribe((res: CompetitionModel[]) => this.inProgress = res);
  }

}
