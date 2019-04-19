import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css']
})
export class OfficialComponent implements OnInit, OnDestroy {

  inProgress: CompetitionModel[];
  upcoming: CompetitionModel[];
  past: CompetitionModel[];

  constructor(private compSVC: CompetitionService, private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    let now: Date = new Date(new Date().toDateString());
    this.compSVC.getUpcomingCompetitions().subscribe((res: CompetitionModel[]) => this.upcoming = res);
    this.compSVC.getPastCompetitions().subscribe((res: CompetitionModel[]) => this.past = res);
    this.compSVC.getOnGoingCompetitions().subscribe((res: CompetitionModel[]) => this.inProgress = res);
    this.titleSVC.setTitle("Competizioni");
    this.metaSVC.updateMeta("title", "Competizioni");
    this.metaSVC.updateMeta("og:title", "Competizioni");
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

}
