import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent implements OnInit, OnDestroy {

  competitions: CompetitionModel[];
  constructor(private compSVC: CompetitionService, private metaSVC: MetaManagerService, private titleSVC: TitleManagerService) { }

  ngOnInit() {
    this.compSVC.getMyCompetitions().subscribe((res: CompetitionModel[]) => this.competitions = res);
    this.titleSVC.setTitle("Le mie competizioni");
    this.metaSVC.addMeta("robots", "noindex,nofollow");
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }
}
