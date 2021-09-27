import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { ExtrasExtrasService } from '../../Services/extras-extras.service';

@Component({
  selector: 'app-extras-extras',
  templateUrl: './extras-extras.component.html',
  styleUrls: ['./extras-extras.component.css']
})
export class ExtrasExtrasComponent implements OnInit, OnDestroy {
  constructor(private ExtrasExtrasService: ExtrasExtrasService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Extras-Extras/";
  header = " Extras-Extras – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Extras-Extras .";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.ExtrasExtrasService.getList()
      .subscribe((data) => {
        this.ExtrasExtrasService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
          });
      }, (error: AppErrorHandler) => {
        throw error;
      });
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}
