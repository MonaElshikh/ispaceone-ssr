import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { HookupsAffairsService } from '../../Services/hookups-affairs.service';

@Component({
  selector: 'app-hookups-affairs',
  templateUrl: './hookups-affairs.component.html',
  styleUrls: ['./hookups-affairs.component.css']
})
export class HookupsAffairsComponent implements OnInit, OnDestroy {
  constructor(private HookupsAffairsService: HookupsAffairsService) { }
  articlesList: any = [];
  HookupsAffairssubscribtion: Subscription;
  url = "/Hookups-Affairs/";
  header = "Hookups & Affairs – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Hookups & Affairs.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.HookupsAffairssubscribtion = this.HookupsAffairsService.getList()
      .subscribe((data) => {
        this.HookupsAffairsService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
          });
      }), (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.HookupsAffairssubscribtion) this.HookupsAffairssubscribtion.unsubscribe();
  }
}
