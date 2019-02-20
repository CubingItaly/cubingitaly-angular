import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {

  @Input() competitionId: string;

  constructor() { }

  ngOnInit() {
    
  }

}
