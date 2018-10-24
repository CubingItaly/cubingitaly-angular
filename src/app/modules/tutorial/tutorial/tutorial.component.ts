import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { TutorialService } from '../services/tutorial.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { TutorialModel } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit, OnDestroy {

  tutorialId: string;
  tutorial: TutorialModel;
  pageIndex: number;
  currentPageId: number;


  constructor(private tutorialSVC: TutorialService, private metaSVC: MetaManagerService, private route: ActivatedRoute, private router: Router, private titleSVC: TitleManagerService) { }

  ngOnInit() {
    this.tutorialId = this.route.snapshot.paramMap.get("id");
    this.pageIndex = Number(this.route.snapshot.paramMap.get("page")) || 1;
    this.tutorialSVC.getTutorial(this.tutorialId).subscribe(res => {
      this.tutorial = res;
      if (this.pageIndex < 1 || this.pageIndex > this.tutorial.pages.length) {
        this.pageIndex = 1;
      }
      this.router.navigate(['../' + this.pageIndex], { relativeTo: this.route });
      this.pageIndex--;
      this.currentPageId = this.tutorial.pages[this.pageIndex].id;
      this.titleSVC.setTitle(this.tutorial.title);
      this.metaSVC.updateMeta("title", this.tutorial.title);
      this.metaSVC.updateMeta("og:title", this.tutorial.title);
    });
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

  pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.currentPageId = this.tutorial.pages[this.pageIndex].id;
    let redirectUrl = "../" + (this.pageIndex + 1);
    this.router.navigate([redirectUrl], { relativeTo: this.route });
    this.scrollToTop();
  }

  scrollToTop() {
    let top = document.querySelector('#top') as HTMLElement;
    top.scrollIntoView();
  }
}
