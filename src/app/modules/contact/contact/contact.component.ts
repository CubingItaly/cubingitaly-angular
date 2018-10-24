import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailSentDialogComponent } from '../email-sent-dialog/email-sent-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  subjectFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);


  constructor(private dialog: MatDialog, private titleSVC: TitleManagerService, private contactSVC: ContactService, private metaSVC: MetaManagerService) { }

  ngOnInit() {
    this.titleSVC.setTitle("Contatti");
    this.metaSVC.updateMeta("title", "Contatti");
    this.metaSVC.updateMeta("og:title", "Contatti");
    this.metaSVC.updateMeta("description", "Compila il form sottostante e sarai ricontattato al più presto via email.");
    this.metaSVC.updateMeta("og:description", "Compila il form sottostante e sarai ricontattato al più presto via email.");
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }


  submit() {
    if (this.messageFormControl.valid && this.emailFormControl.valid && this.subjectFormControl.valid && this.nameFormControl.valid) {
      this.contactSVC.sendMail(this.nameFormControl.value, this.emailFormControl.value, this.subjectFormControl.value, this.messageFormControl.value)
        .subscribe(() => {
          this.dialog.open(EmailSentDialogComponent, {
            minWidth: '200px',
          }).afterClosed().subscribe(() => {
            this.messageFormControl.reset();
            this.nameFormControl.reset();
            this.subjectFormControl.reset();
            this.emailFormControl.reset();
          });
        });
    }
  }
}

