import { Component, OnInit, Input } from '@angular/core';
import { ExtraTabModel } from 'src/app/models/competition/extratab.model';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'extra-tab-edit',
  templateUrl: './extra-tab-edit.component.html',
  styleUrls: ['./extra-tab-edit.component.css']
})
export class ExtraTabEditComponent implements OnInit {

  tabs: ExtraTabModel[];
  @Input() competitionId: string;

  constructor(private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.compSVC.getCompetitionExtraTabs(this.competitionId).subscribe((res) => this.tabs = res);
  }

}
