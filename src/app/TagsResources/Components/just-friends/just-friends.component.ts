import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { JustFriendsService } from '../../Services/just-friends.service';

@Component({
  selector: 'app-just-friends',
  templateUrl: './just-friends.component.html',
  styleUrls: ['./just-friends.component.css']
})
export class JustFriendsComponent implements OnInit, OnDestroy {
  constructor(private JustFriendsService: JustFriendsService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Just-Friends/";
  header = "Just friends – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Just friends.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.JustFriendsService.getList()
      .subscribe((data) => {
        this.JustFriendsService.parseXML(data)
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
