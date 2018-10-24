import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';
import { TeamService } from '../services/team.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {

  teams: TeamModel[] = [];
  displayedColumns = ['name', 'options'];

  constructor(private teamSVC: TeamService, private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.teamSVC.getTeamsList().subscribe((teams: TeamModel[]) => this.teams = teams);
    this.titleSVC.setTitle("Gestione dei team");
    this.metaSVC.addMeta("robots", "noindex,nofollow");
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }

}
