import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { TutorialSummaryComponent } from './tutorial-summary/tutorial-summary.component';
import { TutorialEditorComponent } from './tutorial-editor/tutorial-editor.component';
import { TutorialAdminComponent } from './tutorial-admin/tutorial-admin.component';
import { EditorQuickActionsComponent } from './editor-quick-actions/editor-quick-actions.component';
import { TutorialService } from './services/tutorial.service';
import { TutorialGuardService } from './services/tutorial-guard.service';
import { MatPaginatorIntl, MatTableModule, MatListModule, MatExpansionModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { TutorialItalianMatPaginator } from './services/tutorial.paginator.it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageModule } from '../page/page.module';

const routes: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TutorialListComponent },
  { path: 'admin', canActivate: [TutorialGuardService], component: TutorialAdminComponent, data: { requiredRole: "edit" } },
  { path: 'edit/:id', canActivate: [TutorialGuardService], component: TutorialEditorComponent, data: { intent: "edit", requiredRole: "edit" } },
  { path: 'new', canActivate: [TutorialGuardService], component: TutorialEditorComponent, data: { intent: "new", requiredRole: "create" } },
  { path: ':id', redirectTo: ':id/1', pathMatch: 'full' },
  { path: ':id/:page', component: TutorialComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatDialogModule,
    PageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorialComponent, TutorialListComponent, TutorialSummaryComponent, TutorialEditorComponent, TutorialAdminComponent, EditorQuickActionsComponent],
  providers: [TutorialService, TutorialGuardService, { provide: MatPaginatorIntl, useClass: TutorialItalianMatPaginator }]
})
export class TutorialModule { }
