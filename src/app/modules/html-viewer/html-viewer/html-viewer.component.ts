import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.css']
})
export class HtmlViewerComponent implements OnInit {

  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
