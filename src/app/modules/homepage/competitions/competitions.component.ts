import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionsService } from '../services/competitions.service';

@Component({
  selector: 'competitions-widget',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  ongoing$: Observable<CompetitionModel[]>;
  comp$: Observable<CompetitionModel[]>;

  constructor(private compSVC: CompetitionsService) { }

  ngOnInit() {
    this.ongoing$ = this.compSVC.getOnGoingCompetitions();
    this.comp$ = this.compSVC.getUpcomingCompetitions();
  }
}