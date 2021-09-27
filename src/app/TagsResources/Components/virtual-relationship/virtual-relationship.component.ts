import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { VirtualRelationshipService } from '../../Services/virtual-relationship.service';

@Component({
  selector: 'app-virtual-relationship',
  templateUrl: './virtual-relationship.component.html',
  styleUrls: ['./virtual-relationship.component.css']
})
export class VirtualRelationshipComponent implements OnInit,OnDestroy {
  constructor(private VirtualRelationshipService: VirtualRelationshipService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Virtual-Relationship/";
  header = "Virtual Relationship – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Virtual Relationship.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.VirtualRelationshipService.clearList(this.articlesList);
    this.subscribtion = this.VirtualRelationshipService.getList()
      .subscribe((data) => {
        this.VirtualRelationshipService.parseXML(data)
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
