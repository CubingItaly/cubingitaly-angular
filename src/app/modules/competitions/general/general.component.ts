import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';

@Component({
  selector: 'general-info',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  @Input() competition: CompetitionModel;
  registration: RegistrationModel;

  constructor() { }

  ngOnInit() {
    this.registration = new RegistrationModel();
  }


}
