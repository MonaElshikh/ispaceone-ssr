import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { QuotesSayingsByAuthorService } from 'TagsResources/Services/quotes-sayings-by-author.service';

import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings-author',
  templateUrl: './quotes-sayings-author.component.html',
  styleUrls: ['./quotes-sayings-author.component.css']
})
export class QuotesSayingsAuthorComponent  implements OnInit,OnDestroy {
  constructor(private QuotesSayingsByAuthorService: QuotesSayingsByAuthorService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Quotes-Sayings-author/";
  header = "Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Quotes & Sayings.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.QuotesSayingsByAuthorService.clearList(this.articlesList);
    this.subscribtion = this.QuotesSayingsByAuthorService.getList()
      .subscribe((data) => {
        this.QuotesSayingsByAuthorService.parseXML(data,true)
          .then((data) => {
            this.articlesList = data;
          });
      }), (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}