import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css']
})
export class OfficialComponent implements OnInit {

  competitions: CompetitionModel[];

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
    this.compSVC.getOfficialCompetitions().subscribe((res: CompetitionModel[]) => this.competitions = res);
  }

}
