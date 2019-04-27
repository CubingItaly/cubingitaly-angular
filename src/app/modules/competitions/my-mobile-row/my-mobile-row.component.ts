import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';

@Component({
  selector: 'my-mobile-row',
  templateUrl: './my-mobile-row.component.html',
  styleUrls: ['./my-mobile-row.component.css']
})
export class MyMobileRowComponent implements OnInit {

  @Input() competition: CompetitionModel;


  constructor() { }

  ngOnInit() {
  }

}
