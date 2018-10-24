import { Component, OnInit, OnDestroy } from '@angular/core';
import { TutorialModel } from 'src/app/models/tutorial.model';
import { Observable } from 'rxjs';
import { TutorialService } from '../services/tutorial.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-tutorial-admin',
  templateUrl: './tutorial-admin.component.html',
  styleUrls: ['./tutorial-admin.component.css']
})
export class TutorialAdminComponent implements OnInit, OnDestroy {

  tutorials$: Observable<TutorialModel[]>;
  displayedColumns: string[] = ["title", "editor", "update", "status", "options"];

  constructor(private tutorialSVC: TutorialService, private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.tutorials$ = this.tutorialSVC.getAllTutorials();
    this.titleSVC.setTitle("Gestione tutorial");
    this.metaSVC.addMeta("robots", "noindex,nofollow");
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }

}
