import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { PageModel } from 'src/app/models/page.model';
import { PageService } from '../services/page.service';
import { MatDialog } from '@angular/material/dialog';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'page-component',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges {

  @Input() pageId: number;
  @Input() viewing: boolean = true;
  @Input() titleEditor: boolean = false;

  @Output() pageUpdated: EventEmitter<string> = new EventEmitter<string>();

  page: PageModel;
  titleBackup: string;
  contentBackup: string;
  updated: boolean = false;

  constructor(private dialog: MatDialog, private pageSVC: PageService) { }

  ngOnInit() {
  }

  restore() {
    this.page.content = this.contentBackup;
    this.page.title = this.titleBackup;
  }

  view() {
    this.viewing = true;
    this.scrollToTitle();
  }

  edit() {
    this.viewing = false;
  }

  updatePage() {
    if (this.page.title === "") {
      throw new BadRequestError("È necessario inserire un titolo.");
    }
    else if (this.page.title !== this.titleBackup || this.page.content !== this.contentBackup) {
      if (this.page.isPublic) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          minWidth: '200px',
          data: "Sei sicuro di voler aggiornare la pagina? Le modifiche saranno visibili a chiunque."
        });
        dialogRef.afterClosed().subscribe((res: boolean) => {
          if (res) {
            this.updatePageToServer();
          }
        });
      } else {
        this.updatePageToServer();
      }
    } else {
      this.showUpdateMessage();
      this.scrollToTitle();
    }
  }

  private getPage() {
    this.pageSVC.getPage(this.pageId).subscribe(res => {
      this.page = res;
      this.contentBackup = this.page.content;
      this.titleBackup = this.page.title;
    });
  }

  private updatePageToServer() {
    this.pageSVC.updatePage(this.page).subscribe(res => {
      this.page = res;
      this.titleBackup = this.page.title;
      this.contentBackup = this.page.content;
      this.scrollToTitle();
      this.showUpdateMessage();
      this.pageUpdated.emit(this.page.title);
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['pageId'].currentValue !== changes['pageId'].previousValue) {
      this.getPage();
    }
  }

  private scrollToTitle() {
    const pageTitle = document.querySelector('.page-title') as HTMLElement;
    pageTitle.scrollIntoView();
  }

  private showUpdateMessage() {
    this.updated = true;
    setTimeout(() => {
      this.updated = false;
    }, (7000));
  }
}