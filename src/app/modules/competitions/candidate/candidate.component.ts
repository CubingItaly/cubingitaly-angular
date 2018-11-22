import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit, OnDestroy {

  constructor(private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.titleSVC.setTitle("Competizioni Proposte");
    this.metaSVC.updateMeta("title", "Competizioni Proposte");
    this.metaSVC.updateMeta("og:title", "Competizioni Proposte");
  }

  ngOnDestroy(){
    this.metaSVC.resetMeta();
  }
}
