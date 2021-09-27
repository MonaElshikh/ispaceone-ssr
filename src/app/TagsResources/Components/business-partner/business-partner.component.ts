import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { BusinessPartnerService } from '../../Services/business-partner.service';

@Component({
  selector: 'app-business-partner',
  templateUrl: './business-partner.component.html',
  styleUrls: ['./business-partner.component.css']
})
export class BusinessPartnerComponent implements OnInit, OnDestroy {

  constructor(private BusinessPartnerService: BusinessPartnerService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Business-Partner/";
  header = "Business Partner – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Business Partner.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.BusinessPartnerService.getList()
      .subscribe((data) => {
        this.BusinessPartnerService.parseXML(data)
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
