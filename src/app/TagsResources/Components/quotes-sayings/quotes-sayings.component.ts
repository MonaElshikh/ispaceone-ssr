import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings',
  templateUrl: './quotes-sayings.component.html',
  styleUrls: ['./quotes-sayings.component.css']
})
export class QuotesSayingsComponent implements OnInit,OnDestroy {
  constructor(private QuotesSayingsService: QuotesSayingsService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Quotes-Sayings/";
  header = "Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Quotes & Sayings.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.QuotesSayingsService.clearList(this.articlesList);
    this.subscribtion = this.QuotesSayingsService.getList()
      .subscribe((data) => {
        this.QuotesSayingsService.parseXML(data,true)
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
