import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { FaqService } from '../services/faq.service';
import { FAQModel } from 'src/app/models/faq.model';

@Component({
  selector: 'app-faq-admin',
  templateUrl: './faq-admin.component.html',
  styleUrls: ['./faq-admin.component.css']
})
export class FaqAdminComponent implements OnInit, OnDestroy {

  faq: FAQModel[];
  displayedColumns: string[] = ["title", "options"];

  
  constructor(private titleSVC: TitleManagerService, private metaSVC: MetaManagerService, private FaqSvc: FaqService) { }

  ngOnInit() {
    this.titleSVC.setTitle("Gestione FAQ");
    this.metaSVC.addMeta("robots", "noindex,nofollow");
    this.FaqSvc.getFAQs("").subscribe((f: FAQModel[]) => this.faq = f);
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }
}
