import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { IdiomsProverbsService } from '../../Services/idioms-proverbs.service';

@Component({
  selector: 'app-idioms-proverbs',
  templateUrl: './idioms-proverbs.component.html',
  styleUrls: ['./idioms-proverbs.component.css']
})
export class IdiomsProverbsComponent implements OnInit, OnDestroy {
  constructor(private IdiomsProverbsService: IdiomsProverbsService) { }
  articlesList: any = [];
  IdiomsProverbssubscribtion: Subscription;
  url = "/Idioms-Proverbs/";
  header = "Idioms & Proverbs – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Idioms & Proverbs.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.IdiomsProverbssubscribtion = this.IdiomsProverbsService.getList()
      .subscribe((data) => {
        this.IdiomsProverbsService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
            console.log('IdiomsProverbs >> ' + this.articlesList)
          });
      }), (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.IdiomsProverbssubscribtion) this.IdiomsProverbssubscribtion.unsubscribe();
  }
}
