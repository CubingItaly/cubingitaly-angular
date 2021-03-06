import { Component, OnInit, Input } from '@angular/core';
import { PageModel } from 'src/app/models/page.model';

@Component({
  selector: 'page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})
export class PageViewerComponent implements OnInit {

  @Input() page: PageModel;

  constructor() { }

  ngOnInit() {
  }

}
