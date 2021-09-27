import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { SpousesCouplesService } from '../../Services/spouses-couples.service';

@Component({
  selector: 'app-spouses-couples',
  templateUrl: './spouses-couples.component.html',
  styleUrls: ['./spouses-couples.component.css']
})
export class SpousesCouplesComponent implements OnInit,OnDestroy {

  constructor(private SpousesCouplesService: SpousesCouplesService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Spouses-Couples/";
  header = "Spouses & Couples – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Spouses & Couples.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.SpousesCouplesService.clearList(this.articlesList);
    this.subscribtion = this.SpousesCouplesService.getList()
      .subscribe((data) => {
        this.SpousesCouplesService.parseXML(data)
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
