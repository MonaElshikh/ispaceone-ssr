import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { CareerOpportunitiesService } from '../../Services/career-opportunities.service';

@Component({
  selector: 'app-career-opportunities',
  templateUrl: './career-opportunities.component.html',
  styleUrls: ['./career-opportunities.component.css']
})
export class CareerOpportunitiesComponent implements OnInit, OnDestroy {
  constructor(private CareerOpportunitiesService: CareerOpportunitiesService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Career-Opportunities/";
  header = "Career-Opportunities – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Career-Opportunities.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.CareerOpportunitiesService.getList()
      .subscribe((data) => {
        this.CareerOpportunitiesService.parseXML(data)
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
