import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tutorial-editor-quick-actions',
  templateUrl: './editor-quick-actions.component.html',
  styleUrls: ['./editor-quick-actions.component.css']
})
export class EditorQuickActionsComponent implements OnInit {

  @Input() tutorialId: string;
  @Input() editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
