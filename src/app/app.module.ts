import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http/'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faLink, faPlusCircle, faTimesCircle, faArrowCircleUp, faArrowCircleDown, faInfoCircle, faBook, faEnvelope, faLock, faCheck, faEdit, faTrash, faPlusSquare, faEye, faList, faBars, faLongArrowAltDown, faArrowUp, faLongArrowAltUp, faUserSlash, faUserPlus, faUser, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter, faTelegram, faYoutube, faTelegramPlane, faInstagram, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

library.add(faHome, faInfoCircle, faLink, faTelegramPlane, faPlusCircle, faTimesCircle, faNewspaper, faBook, faEnvelope, faWhatsapp, faLock, faTrash, faCopyright, faArrowUp, faPlusSquare, faEye, faList,
  faFacebookF, faTwitter, faTelegram, faArrowCircleUp, faArrowCircleDown, faYoutube, faInstagram, faGithub, faCheck, faEdit, faUser, faBars, faLongArrowAltDown, faLongArrowAltUp, faUserSlash, faUserPlus, faTrophy);


import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it');

import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { WCAService } from './services/wca.service';
import { MetaManagerService } from './services/meta-manager.service';
import { TitleManagerService } from './services/title-manager.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { HttpService } from './services/http.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PermissionDeniedComponent } from './components/permission-denied/permission-denied.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { EmailSentDialogComponent } from './modules/contact/email-sent-dialog/email-sent-dialog.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SlideshowModule } from 'ng-simple-slideshow';
import { PanelModule } from './modules/panel/panel.module';
import { ContactModule } from './modules/contact/contact.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { AboutUsModule } from './modules/about-us/about-us.module';
import { LoginModule } from './modules/login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    FooterComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
    PermissionDeniedComponent,
    BackToTopComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatDialogModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    SlideshowModule,
    PanelModule,
    HomepageModule,
    AboutUsModule,
    LoginModule,
    MatIconModule,
    ContactModule,
    ShareButtonsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true },
    { provide: LOCALE_ID, useValue: "it-IT" },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthService,
    UserService,
    WCAService,
    MetaManagerService,
    TitleManagerService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent, ConfirmDialogComponent, EmailSentDialogComponent]
})
export class AppModule { }
