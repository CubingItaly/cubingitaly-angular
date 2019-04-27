import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';

@Component({
  selector: 'official-mobile-row',
  templateUrl: './mobile-row-official.component.html',
  styleUrls: ['./mobile-row-official.component.css']
})
export class MobileRowOfficialComponent implements OnInit {

  @Input() competition: CompetitionModel;

  constructor() { }

  ngOnInit() {
  }


}
