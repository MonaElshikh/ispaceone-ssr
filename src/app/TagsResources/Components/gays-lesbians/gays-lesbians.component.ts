import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { GaysLesbiansService } from '../../Services/gays-lesbians.service';

@Component({
  selector: 'app-gays-lesbians',
  templateUrl: './gays-lesbians.component.html',
  styleUrls: ['./gays-lesbians.component.css']
})
export class GaysLesbiansComponent implements OnInit,OnDestroy {
  constructor( private GaysLesbiansService: GaysLesbiansService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Gays-Lesbians/";
  header = "Gays & Lesbians – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Gays & Lesbians.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.GaysLesbiansService.getList()
      .subscribe((data) => {
        this.GaysLesbiansService.parseXML(data)
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
