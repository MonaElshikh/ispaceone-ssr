import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { HeartbreaksBreakupsService } from '../../Services/heartbreaks-breakups.service';

@Component({
  selector: 'app-heartbreaks-breakups',
  templateUrl: './heartbreaks-breakups.component.html',
  styleUrls: ['./heartbreaks-breakups.component.css']
})
export class HeartbreaksBreakupsComponent implements OnInit, OnDestroy {

  constructor(private HeartbreaksBreakupsService: HeartbreaksBreakupsService) { }
  articlesList: any = []; 
  subscribtion: Subscription;
  url = "/Heartbreaks-Breakups/";
  header = "Heartbreaks & Breakups – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Heartbreaks & Breakups.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.HeartbreaksBreakupsService.getList()
      .subscribe((data) => {
        this.HeartbreaksBreakupsService.parseXML(data)
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
