import { Component, OnInit } from '@angular/core';
import { WCAService } from 'src/app/services/wca.service';
import { CompWidgetModel } from 'src/app/models/comp.widget.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'competitions-widget',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  ongoing$: Observable<CompWidgetModel[]>;
  comp$: Observable<CompWidgetModel[]>;

  constructor(private wcaSVC: WCAService) { }

  ngOnInit() {
    this.ongoing$ = this.wcaSVC.fetchOngoingCompetitions();
    this.comp$ = this.wcaSVC.fetchUpcomingCompetitions();
  }

}