import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './modules/contact/contact/contact.component';
import { LoginComponent } from './modules/login/login/login.component';
import { PermissionDeniedComponent } from './components/permission-denied/permission-denied.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PanelComponent } from './modules/panel/panel/panel.component';
import { HomepageComponent } from './modules/homepage/homepage/homepage.component';
import { AboutUsComponent } from './modules/about-us/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'pannello', component: PanelComponent },
  { loadChildren: 'src/app/modules/team/team.module#TeamModule', path: 'team' },
  { loadChildren: 'src/app/modules/article/article.module#ArticleModule', path: 'articoli' },
  { loadChildren: 'src/app/modules/tutorial/tutorial.module#TutorialModule', path: 'tutorial' },
  { loadChildren: 'src/app/modules/competitions/competitions.module#CompetitionsModule', path: 'competizioni' },
  { path: 'chi-siamo', component: AboutUsComponent },
  { path: 'contatti', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'permesso-negato', component: PermissionDeniedComponent },
  { path: 'non-trovato', component: NotFoundComponent },
  { path: '**', redirectTo: "/non-trovato" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
