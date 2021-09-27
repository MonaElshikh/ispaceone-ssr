import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { ShortRelationShipService } from '../../Services/short-relation-ship.service';

@Component({
  selector: 'app-short-relation-ship',
  templateUrl: './short-relation-ship.component.html',
  styleUrls: ['./short-relation-ship.component.css']
})
export class ShortRelationShipComponent implements OnInit ,OnDestroy{
  constructor(private ShortRelationShipService: ShortRelationShipService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Short-Relationship/";
  header = "Short Relationship – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Short Relationship.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.ShortRelationShipService.clearList(this.articlesList);
    this.subscribtion = this.ShortRelationShipService.getList()
      .subscribe((data) => {
        this.ShortRelationShipService.parseXML(data)
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
