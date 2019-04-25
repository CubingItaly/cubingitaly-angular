import { Component, OnInit, Input } from '@angular/core';
import { ExtraTabModel } from 'src/app/models/competition/extratab.model';

@Component({
  selector: 'extra-tab',
  templateUrl: './extra-tab.component.html',
  styleUrls: ['./extra-tab.component.css']
})
export class ExtraTabComponent implements OnInit {

  @Input() tab: ExtraTabModel;

  constructor() { }

  ngOnInit() {
  }

}
