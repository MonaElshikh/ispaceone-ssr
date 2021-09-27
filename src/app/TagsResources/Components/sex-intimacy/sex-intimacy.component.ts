import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { SexIntimacyService } from '../../Services/sex-intimacy.service';

@Component({
  selector: 'app-sex-intimacy',
  templateUrl: './sex-intimacy.component.html',
  styleUrls: ['./sex-intimacy.component.css']
})
export class SexIntimacyComponent implements OnInit, OnDestroy {
  constructor(private SexIntimacyService: SexIntimacyService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Sex-Intimacy/";
  header = "Sex & Intimacy – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Sex & Intimacy.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.SexIntimacyService.clearList(this.articlesList);
    this.subscribtion = this.SexIntimacyService.getList()
      .subscribe((data) => {
        this.SexIntimacyService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
          });
      }, (error: AppErrorHandler) => {
        throw error;
      });
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}
