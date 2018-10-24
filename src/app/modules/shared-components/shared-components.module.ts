import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role.directive';
import { ShareComponent } from './share/share.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FacebookWidgetComponent } from './share/facebook-widget/facebook-widget.component';
import { YoutubeWidgetComponent } from './share/youtube-widget/youtube-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ShareButtonsModule,
    FlexLayoutModule
  ],
  declarations: [RoleDirective, ShareComponent, FacebookWidgetComponent, YoutubeWidgetComponent],
  exports: [RoleDirective, ShareComponent, FacebookWidgetComponent, YoutubeWidgetComponent]
})
export class SharedComponentsModule { }
