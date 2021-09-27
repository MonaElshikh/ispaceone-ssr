import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { ActivityPartnerService } from '../../Services/activity-partner.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-activity-partner',
  templateUrl: './activity-partner.component.html',
  styleUrls: ['./activity-partner.component.css']
})
export class ActivityPartnerComponent implements OnInit,OnDestroy {
  constructor(
    private ActivityPartnerService: ActivityPartnerService,
    private metaService: MetaTagslService) { }
  articlesList: any = [];
  subscribtion:Subscription;
  url = "/Activity-Partner/";
  header = "Activity-Partner – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Activity-Partner.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.subscribtion = this.ActivityPartnerService.getList()
    .subscribe((data) => {
      this.ActivityPartnerService.parseXML(data)
        .then((result) => {
          this.articlesList = result;
        });
    }), (error: AppErrorHandler) => {
      throw error;
    };
  }
  ngOnDestroy(){
    if(this.subscribtion) this.subscribtion.unsubscribe();
  }
}
