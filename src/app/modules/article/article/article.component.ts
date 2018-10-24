import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { MetaManagerService } from 'src/app/services/meta-manager.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article: ArticleModel;

  constructor(private articleSVC: ArticleService, private route: ActivatedRoute, private titleSVC: TitleManagerService,
    private metaSVC: MetaManagerService) { }

  ngOnInit() {
    let articleId: string = this.route.snapshot.paramMap.get("id");
    this.articleSVC.getArticle(articleId).subscribe(article => {
      this.article = article;
      this.titleSVC.setTitle(this.article.title);
      this.metaSVC.updateMeta("title", this.article.title);
      this.metaSVC.updateMeta("description", this.article.summary);
      this.metaSVC.updateMeta("og:title", this.article.title);
      this.metaSVC.updateMeta("og:description", this.article.summary);
    });
  }

  ngOnDestroy() {
    this.metaSVC.resetMeta();
  }

}
