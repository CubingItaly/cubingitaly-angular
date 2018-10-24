import { Component, OnInit, Input } from '@angular/core';
import { PageModel } from 'src/app/models/page.model';
import * as Editor from 'src/assets/ckeditor/ckeditor';

@Component({
  selector: 'page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {

  @Input() page: PageModel;
  editor = Editor;

  constructor() { }

  ngOnInit() {
    if (this.page.content === undefined || this.page.content === 'undefined')
      this.page.content = "";
  }

}
