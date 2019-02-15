import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';

@Component({
  selector: 'registration-info',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() competition: CompetitionModel;

  constructor() { }

  ngOnInit() {
  }

}
