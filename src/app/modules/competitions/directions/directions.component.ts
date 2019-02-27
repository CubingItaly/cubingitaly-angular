import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { DirectionsModel } from 'src/app/models/competition/directions.model';

@Component({
  selector: 'directions-info',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  @Input() directions: DirectionsModel[];

  constructor(private compSVC: CompetitionService) { }

  ngOnInit() {
  }

}
