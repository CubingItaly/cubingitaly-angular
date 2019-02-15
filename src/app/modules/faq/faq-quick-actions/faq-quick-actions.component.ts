import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'faq-quick-actions',
  templateUrl: './faq-quick-actions.component.html',
  styleUrls: ['./faq-quick-actions.component.css']
})
export class FaqQuickActionsComponent implements OnInit {

  @Input() faqId: number;
  @Input() editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}


