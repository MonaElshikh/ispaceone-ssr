import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { DatingCourtshipService } from '../../Services/dating-courtship.service';

@Component({
  selector: 'app-dating-courtship',
  templateUrl: './dating-courtship.component.html',
  styleUrls: ['./dating-courtship.component.css']
})
export class DatingCourtshipComponent implements OnInit, OnDestroy {
  constructor(private DatingCourtshipService: DatingCourtshipService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Dating-Courtship/";
  header = "Dating & Courtship – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Dating & Courtship.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.DatingCourtshipService.getList()
      .subscribe((data) => {
        this.DatingCourtshipService.parseXML(data)
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
