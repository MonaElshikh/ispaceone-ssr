import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { LongRelationShipService } from '../../Services/long-relation-ship.service';

@Component({
  selector: 'app-long-relation-ship',
  templateUrl: './long-relation-ship.component.html',
  styleUrls: ['./long-relation-ship.component.css']
})
export class LongRelationShipComponent implements OnInit, OnDestroy {
  constructor(private LongRelationShipService: LongRelationShipService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Long-Relationship/";
  header = "Long-RelationShip – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Long-RelationShip.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.LongRelationShipService.getList()
      .subscribe((data) => {
        this.LongRelationShipService.parseXML(data)
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
