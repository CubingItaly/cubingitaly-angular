import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-sent-dialog',
  templateUrl: './email-sent-dialog.component.html',
  styleUrls: ['./email-sent-dialog.component.css']
})
export class EmailSentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailSentDialogComponent>) { }

  ngOnInit() {
  }

}
