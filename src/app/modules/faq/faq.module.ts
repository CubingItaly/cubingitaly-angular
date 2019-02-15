import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './faq-routing.module';
import { FaqComponent } from './faq/faq.component';
import { FaqEditComponent } from './faq-edit/faq-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule, MatListModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FaqService } from './services/faq.service';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';
import { FaqAdminComponent } from './faq-admin/faq-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FaqQuickActionsComponent } from './faq-quick-actions/faq-quick-actions.component';
import { FAQGuardService } from './services/faq-guard.service';

@NgModule({
  declarations: [FaqComponent, FaqEditComponent, FaqAdminComponent, FaqQuickActionsComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    CommonModule,
    CKEditorModule,
    MatDialogModule,
    MatInputModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatSelectModule,
    MatTableModule,
    CommonModule,
    HtmlViewerModule
  ],
  providers: [FaqService, FAQGuardService]
})
export class FaqModule { }
