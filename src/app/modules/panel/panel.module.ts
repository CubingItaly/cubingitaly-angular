import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ArticlePanelComponent } from './article-panel/article-panel.component';
import { TeamPanelComponent } from './team-panel/team-panel.component';
import { TutorialPanelComponent } from './tutorial-panel/tutorial-panel.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FaqPanelComponent } from './faq-panel/faq-panel.component';
import { CompPanelComponent } from './comp-panel/comp-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatListModule,
    SharedComponentsModule
  ],
  declarations: [PanelComponent, ArticlePanelComponent, TeamPanelComponent, TutorialPanelComponent, FaqPanelComponent, CompPanelComponent]
})
export class PanelModule { }
