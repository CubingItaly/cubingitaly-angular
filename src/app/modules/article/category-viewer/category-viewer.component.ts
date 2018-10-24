import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';

@Component({
  selector: 'article-category-viewer',
  templateUrl: './category-viewer.component.html',
  styleUrls: ['./category-viewer.component.css']
})
export class CategoryVIewerComponent implements OnInit {

  @Input() article: ArticleModel;

  constructor() { }

  ngOnInit() {
  }

}