import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { Observable } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition.model';

@Component({
  selector: 'app-official',
  templateUrl: './official.component.html',
  styleUrls: ['./official.component.css']
})
export class OfficialComponent implements OnInit {
 
  competitions$: Observable<CompetitionModel[]>

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
    this.competitions$= this.compSVC.getOfficialCompetitions();
  }

}
