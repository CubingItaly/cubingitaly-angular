import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';

@Component({
  selector: 'my-desktop-table',
  templateUrl: './my-desktop-table.component.html',
  styleUrls: ['./my-desktop-table.component.css']
})
export class MyDesktopTableComponent implements OnInit {

  @Input() competitions: CompetitionModel[];

  constructor() { }

  ngOnInit() {
  }

}
