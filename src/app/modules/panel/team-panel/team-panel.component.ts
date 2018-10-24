import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamModel } from 'src/app/models/team.model';
import { PanelService } from '../services/panel.service';

@Component({
  selector: 'team-panel',
  templateUrl: './team-panel.component.html',
  styleUrls: ['./team-panel.component.css']
})
export class TeamPanelComponent implements OnInit {

  teams$: Observable<TeamModel[]>;

  constructor(private panelSVC: PanelService) { }

  ngOnInit() {
    this.teams$ = this.panelSVC.getTeams();
  }

}