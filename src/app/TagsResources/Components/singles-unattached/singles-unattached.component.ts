import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { SinglesUnattachedService } from '../../Services/singles-unattached.service';

@Component({
  selector: 'app-singles-unattached',
  templateUrl: './singles-unattached.component.html',
  styleUrls: ['./singles-unattached.component.css']
})
export class SinglesUnattachedComponent implements OnInit ,OnDestroy{
  constructor( private SinglesUnattachedService: SinglesUnattachedService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Singles-Unattached/";
  header = "Singles & Unattached – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Singles & Unattached.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.SinglesUnattachedService.clearList(this.articlesList);
    this.subscribtion = this.SinglesUnattachedService.getList()
      .subscribe((data) => {
        this.SinglesUnattachedService.parseXML(data)
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
