import { Component, OnInit, Input } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'general-info',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Input() registration: RegistrationModel;
  isRegistrationOpen: boolean = false;;
  isRegistrationStarted: boolean = false;
  isLimitReached: boolean;

  constructor() { }

  ngOnInit() {
    let now = new Date();
    if (now.getTime() < this.registration.registrationOpen.getTime()) {
      this.isRegistrationOpen = false;
      this.isRegistrationStarted = false;
    } else if (now.getTime() >= this.registration.registrationClose.getTime()) {
      this.isRegistrationOpen = false;
      this.isRegistrationStarted = true;
    } else {
      this.isRegistrationOpen = true;
      this.isRegistrationStarted = true;
    }
  }
}
