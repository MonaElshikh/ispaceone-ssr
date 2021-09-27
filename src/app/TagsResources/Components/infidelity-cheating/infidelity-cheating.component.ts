import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { InfidelityCheatingService } from '../../Services/infidelity-cheating.service';

@Component({
  selector: 'app-infidelity-cheating',
  templateUrl: './infidelity-cheating.component.html',
  styleUrls: ['./infidelity-cheating.component.css']
})
export class InfidelityCheatingComponent implements OnInit {
  constructor(private InfidelityCheatingService: InfidelityCheatingService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Infidelity-Cheating/";
  header = "Infidelity & Cheating – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Infidelity & Cheating.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.InfidelityCheatingService.getList()
      .subscribe((data) => {
        this.InfidelityCheatingService.parseXML(data)
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
