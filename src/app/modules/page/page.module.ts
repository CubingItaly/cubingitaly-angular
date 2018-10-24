import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { PageViewerComponent } from './page-viewer/page-viewer.component';
import { PageService } from './services/page.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FontAwesomeModule,
    CKEditorModule,
    HtmlViewerModule
  ],
  declarations: [PageComponent, PageEditorComponent, PageViewerComponent],
  exports: [PageComponent, PageViewerComponent],
  providers: [PageService]
})
export class PageModule { }
