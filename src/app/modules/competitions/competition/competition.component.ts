import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition: CompetitionModel;

  constructor(private compSVC: CompetitionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let compId: string = this.route.snapshot.paramMap.get("id");
    this.compSVC.getCompetition(compId).subscribe((res: CompetitionModel) => { console.log(res); this.competition = res; });
  }

}
