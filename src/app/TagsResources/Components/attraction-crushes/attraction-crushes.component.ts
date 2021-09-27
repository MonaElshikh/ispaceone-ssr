import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { AttractionCrushesService } from '../../Services/attraction-crushes.service';

@Component({
  selector: 'app-attraction-crushes',
  templateUrl: './attraction-crushes.component.html',
  styleUrls: ['./attraction-crushes.component.css']
})
export class AttractionCrushesComponent implements OnInit, OnDestroy {
  constructor(private AttractionCrushesService: AttractionCrushesService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Attraction-Crushes/";
  header = "Attraction & Crushes – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Attraction & Crushes.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.AttractionCrushesService.getList()
      .subscribe((data) => {
        this.AttractionCrushesService.parseXML(data)
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
