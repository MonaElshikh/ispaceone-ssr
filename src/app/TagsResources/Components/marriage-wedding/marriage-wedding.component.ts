import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { MarriageWeddingService } from '../../Services/marriage-wedding.service';

@Component({
  selector: 'app-marriage-wedding',
  templateUrl: './marriage-wedding.component.html',
  styleUrls: ['./marriage-wedding.component.css']
})
export class MarriageWeddingComponent implements OnInit,OnDestroy {

  constructor( private MarriageWeddingService: MarriageWeddingService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Marriage-Wedding/";
  header = "Marriage & Wedding – Articles, Blogs, Comments, Marriage & Wedding";
  lbl1 = "Here you will find the best collection of articles on Astrology & Horoscope.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.MarriageWeddingService.clearList(this.articlesList);
    // this.articlesList = this.loveRomanceService.getAll();
    this.subscribtion = this.MarriageWeddingService.getList()
      .subscribe((data) => {
        this.MarriageWeddingService.parseXML(data)
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
