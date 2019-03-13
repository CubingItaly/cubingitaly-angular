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
    this.compSVC.getOfficialCompetitions().subscribe((res: CompetitionModel[]) => {
      this.inProgress = this.sortCompetitions(res.filter((c: CompetitionModel) => c.startDate <= now && c.endDate >= now));
      this.upcoming = this.sortCompetitions(res.filter((c: CompetitionModel) => c.startDate > now));
      this.past = this.sortCompetitions(res.filter((c: CompetitionModel) => c.endDate < now));
    });

  }

  sortCompetitions(comps: CompetitionModel[]): CompetitionModel[] {
    return comps.sort((a: CompetitionModel, b: CompetitionModel) => {
      if (a.startDate > b.startDate)
        return 11;
      if (a.startDate < b.startDate)
        return -1;
      if (a.endDate > b.endDate)
        return 1;
      if (a.endDate < b.endDate)
        return -1;
      return 0;
    })
  }


}
