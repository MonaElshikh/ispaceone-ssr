import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { HarmonyCompatibilityService } from '../../Services/harmony-compatibility.service';

@Component({
  selector: 'app-harmony-compatibility',
  templateUrl: './harmony-compatibility.component.html',
  styleUrls: ['./harmony-compatibility.component.css']
})
export class HarmonyCompatibilityComponent implements OnInit, OnDestroy {
  constructor(private HarmonyCompatibilityService: HarmonyCompatibilityService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Harmony-Compatibility/";
  header = "Harmony & Compatibility – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Harmony & Compatibility.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.HarmonyCompatibilityService.getList()
      .subscribe((data) => {
        this.HarmonyCompatibilityService.parseXML(data)
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
