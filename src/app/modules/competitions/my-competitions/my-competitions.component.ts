import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent implements OnInit {

  competitions: CompetitionModel[];
  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
    this.compSVC.getMyCompetitions().subscribe((res: CompetitionModel[]) => this.competitions = res);

  }

}
