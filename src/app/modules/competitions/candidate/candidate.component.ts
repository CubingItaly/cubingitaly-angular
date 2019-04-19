import { Component, OnInit } from '@angular/core';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  constructor(private titleSVC: TitleManagerService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.titleSVC.setTitle("Competizioni Proposte");
    this.metaSVC.updateMeta("title", "Competizioni Proposte");
    this.metaSVC.updateMeta("og:title", "Competizioni Proposte");
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

}
