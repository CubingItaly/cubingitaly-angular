import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  competition: CompetitionModel;
  updated: boolean;

  constructor(private compSVC: CompetitionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let compId: string = this.route.snapshot.paramMap.get("id");
    this.compSVC.getCompetition(compId).subscribe((res: CompetitionModel) => this.competition = res);
  }
}
