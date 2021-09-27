import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { FriendsAcquaintancesService } from '../../Services/friends-acquaintances.service';

@Component({
  selector: 'app-friends-acquaintances',
  templateUrl: './friends-acquaintances.component.html',
  styleUrls: ['./friends-acquaintances.component.css']
})
export class FriendsAcquaintancesComponent implements OnInit, OnDestroy {
  constructor(private FriendsAcquaintancesService: FriendsAcquaintancesService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Friends-Acquaintances/";
  header = "Friends & Acquaintances – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Friends & Acquaintances.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.FriendsAcquaintancesService.getList()
      .subscribe((data) => {
        this.FriendsAcquaintancesService.parseXML(data)
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
