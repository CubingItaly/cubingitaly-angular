import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PageModule } from '../page/page.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PageModule,
    MatButtonModule,
    SharedComponentsModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
