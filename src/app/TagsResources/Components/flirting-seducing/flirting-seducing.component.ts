import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { FlirtingSeducingService } from '../../Services/flirting-seducing.service';

@Component({
  selector: 'app-flirting-seducing',
  templateUrl: './flirting-seducing.component.html',
  styleUrls: ['./flirting-seducing.component.css']
})
export class FlirtingSeducingComponent implements OnInit,OnDestroy {
  constructor(private FlirtingSeducingService: FlirtingSeducingService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Flirting-Seducing/";
  header = "Flirting & Seducing – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Flirting & Seducing.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.FlirtingSeducingService.getList()
      .subscribe((data) => {
        this.FlirtingSeducingService.parseXML(data)
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
