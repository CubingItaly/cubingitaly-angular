import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { FaqService } from '../services/faq.service';
import { FAQModel } from 'src/app/models/faq.model';
import { FAQCategoryModel } from 'src/app/models/faq-category.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {

  constructor(private titleSVC: TitleManagerService, private metaSVC: MetaManagerService, public FAQSvc: FaqService) { }

  categories: FAQCategoryModel[];
  faqCategoryMap: Map<string, FAQModel[]> = new Map<string, FAQModel[]>();

  ngOnInit() {
    this.titleSVC.setTitle("Domande Frequenti");
    this.metaSVC.updateMeta("title", "Domande Frequenti");
    this.metaSVC.updateMeta("og:title", "Domande Frequenti");
    this.metaSVC.updateMeta("description", "Trova le risposte alle domande più frequenti riguardo Cubing Italy e alle competizioni.");

    this.FAQSvc.getCategories().subscribe((c: FAQCategoryModel[]) => {
      this.categories = c;
      this.categories.forEach((cat: FAQCategoryModel) => {
        this.FAQSvc.getFAQs(cat.id).subscribe((faq: FAQModel[]) => {
          this.faqCategoryMap[cat.id] = faq;
        });
      });
    });
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

}
