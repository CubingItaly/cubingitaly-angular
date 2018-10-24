import { Route } from "@angular/router";
import { ArticleGuardService } from "./services/article-guard.service";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleEditorComponent } from "./article-editor/article-editor.component";
import { ArticleAdminComponent } from "./article-admin/article-admin.component";
import { ArticleComponent } from "./article/article.component";

export const routes: Route[] = [
    {
        path: '', redirectTo: 'categorie/all/1', pathMatch: 'full'
    },
    {
        path: 'categorie/:category', redirectTo: 'categorie/all/1', pathMatch: 'full'
    },
    {
        path: 'categorie/:category/:page', component: ArticleListComponent
    },
    {
        path: 'admin', canActivate: [ArticleGuardService], redirectTo: 'admin/1', pathMatch: 'full', data: { requiredRole: "admin" }
    },
    {
        path: 'admin/:page', canActivate: [ArticleGuardService], component: ArticleAdminComponent, data: { requiredRole: "admin" }
    },
    {
        path: 'new', canActivate: [ArticleGuardService], component: ArticleEditorComponent, data: { intent: "new", requiredRole: "admin" }
    },
    {
        path: 'edit/:id', canActivate: [ArticleGuardService], component: ArticleEditorComponent, data: { intent: "edit", requiredRole: "editor" }
    },
    {
        path: ':id', component: ArticleComponent
    }
];
