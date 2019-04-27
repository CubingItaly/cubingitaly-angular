import { Component, OnInit, Input } from '@angular/core';
import { CompetitionComponent } from '../competition/competition.component';

@Component({
  selector: 'desktop-official-table',
  templateUrl: './desktop-official-table.component.html',
  styleUrls: ['./desktop-official-table.component.css']
})
export class DesktopOfficialTableComponent implements OnInit {

  @Input() competitions: CompetitionComponent[];

  constructor() { }

  ngOnInit() {
  }

}
