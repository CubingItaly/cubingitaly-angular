import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticleAdminComponent } from './article-admin/article-admin.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CategoryVIewerComponent } from './category-viewer/category-viewer.component';
import { CategoryWidgetComponent } from './category-widget/category-widget.component';
import { EditorQuickActionsComponent } from './editor-quick-actions/editor-quick-actions.component';
import { MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatPaginatorModule, MatPaginatorIntl, MatDialogModule, MatRadioModule, MatCardModule, MatTableModule, MatExpansionModule, MatChipsModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from './services/article.service';
import { ArticleGuardService } from './services/article-guard.service';
import { ItalianMatPaginator } from './services/article.paginator.it';
import { routes } from './article-routing.module';
import { RouterModule } from '@angular/router';
import { ArticleListViewerComponent } from './article-list-viewer/article-list-viewer.component';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    HtmlViewerModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    CKEditorModule,
    FlexLayoutModule,
    SharedComponentsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ArticleComponent, ArticleAdminComponent, ArticleEditorComponent, ArticleListComponent, CategoryVIewerComponent, CategoryWidgetComponent, EditorQuickActionsComponent, ArticleListViewerComponent],
  providers: [ArticleService, ArticleGuardService, { provide: MatPaginatorIntl, useClass: ItalianMatPaginator }],
  exports: [ArticleListViewerComponent]
})
export class ArticleModule { }
