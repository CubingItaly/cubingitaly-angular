import { Component, OnInit, OnDestroy } from '@angular/core';
import { FAQModel } from 'src/app/models/faq.model';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { FaqService } from '../services/faq.service';
import * as Editor from 'src/assets/ckeditor/ckeditor';
import { FAQCategoryModel } from 'src/app/models/faq-category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { BadRequestError } from 'src/app/errors/bad.request.error';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css']
})
export class FaqEditComponent implements OnInit, OnDestroy {

  isNew: boolean = false;
  faq: FAQModel;
  categories: FAQCategoryModel[];
  editor = Editor;
  updated: boolean;

  constructor(private router: Router, private dialog: MatDialog, private titleSVC: TitleManagerService, private metaSVC: MetaManagerService, private FaqSvc: FaqService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.metaSVC.addMeta("robots", "noindex,nofollow");
    this.FaqSvc.getCategories().subscribe((c: FAQCategoryModel[]) => this.categories = c);

    let intent: string = this.route.snapshot.data.intent;
    if (intent === "new") {
      this.titleSVC.setTitle("Nuova FAQ");
      this.metaSVC.updateMeta("title", "Nuova FAQ");
      this.isNew = true;
      this.faq = new FAQModel();
      this.faq.content = "";
    } else {
      this.titleSVC.setTitle("Modifica FAQ");
      this.metaSVC.updateMeta("title", "Modifica FAQ");
      this.FaqSvc.getFAQ(this.route.snapshot.paramMap.get("id")).subscribe((f: FAQModel) => {
        this.faq = f;
      })
    }
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }

  createFaq() {
    if (this.faq.title && this.faq.content && this.faq.category) {
      this.FaqSvc.createFAQ(this.faq).subscribe((result: FAQModel) => {
        let redirecUrl = "/faq/" + result.id + "/edit";
        this.router.navigate([redirecUrl]);
      });
    } else {
      throw new BadRequestError("Per poter creare una FAQ è necessario compilare tutti i campi.");
    }
  }

  deleteFaq() {
    if (!this.isNew) {
      let obs = this.createDialog("Sei sicuro di voler cancellare la FAQ? L'azione non è reversibile e dopo che la avrai cancellato nessuno potrà più recuperarla.");
      obs.subscribe((result: boolean) => {
        if (result) {
          this.FaqSvc.deleteFAQ(String(this.faq.id)).subscribe(() => {
            this.router.navigate(['/faq/admin']);
          });
        }
      });
    } else {
      this.router.navigate(['/faq/admin']);
    }

  }

  updateFaq() {
    if (this.faq.title.length > 0 && this.faq.content.length > 0 && this.faq.category) {
      let obs = this.createDialog("La FAQ che stai modificando è pubblica e le modifiche saranno visibili da chiunque. Sei sicuro di voler procedere?");
      obs.subscribe((result: boolean) => {
        if (result) {
          this.FaqSvc.updateFAQ(this.faq).subscribe((result: FAQModel) => {
            this.faq = result;
            this.actionAfterUpdate();
          });
        }
      });
    } else {
      throw new BadRequestError("Per poter modificare una FAQ è necessario compilare tutti i campi.");
    }
  }

  compareFn(o1: FAQCategoryModel, o2: FAQCategoryModel) {
    if (o1 && o2 && o1.id && o2.id) {
      return o1.id === o2.id;
    }
    return false;
  }

  private actionAfterUpdate() {
    const pageTitle = document.querySelector('h1') as HTMLElement;
    pageTitle.scrollIntoView();
    this.updated = true;
    setTimeout(() => {
      this.updated = false;
    }, 7000);
  }

  private createDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '200px',
      data: message
    });

    return dialogRef.afterClosed();
  }
}
