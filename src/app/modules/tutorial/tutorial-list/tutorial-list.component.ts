import { Component, OnInit, OnDestroy } from '@angular/core';
import { TutorialModel } from 'src/app/models/tutorial.model';
import { TutorialService } from '../services/tutorial.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit, OnDestroy {

  tutorials: TutorialModel[];
  pageId: number = 2;

  constructor(private tutorialSVC: TutorialService, private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.tutorialSVC.getTutorials().subscribe((res: TutorialModel[]) => this.tutorials = res.sort((a, b) => {
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    })
    );
    this.titleSVC.setTitle("Tutorial");
    this.metaSVC.updateMeta("title", "Tutorial");
    this.metaSVC.updateMeta("description", "In questa pagina trovi un elenco di tutorial redatti dal Team Qualità di Cubing Italy");
    this.metaSVC.updateMeta("og:title", "Tutorial");
    this.metaSVC.updateMeta("og:description", "In questa pagina trovi un elenco di tutorial redatti dal Team Qualità di Cubing Italy");
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

}
