import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { HookupsAffairsService } from '../../Services/hookups-affairs.service';

@Component({
  selector: 'app-hookups-affairs-details',
  templateUrl: './hookups-affairs-details.component.html',
  styleUrls: ['./hookups-affairs-details.component.css']
})
export class HookupsAffairsDetailsComponent implements OnInit, OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Hookups-Affairs – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Heartbreaks-Breakups/';
  menuUrl="/Tags";
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  articles: any = [];
  extraList = [];
  arrayLength: number;
  listSubscribe: Subscription;
  subscript: Subscription;
  constructor(
    private HookupsAffairsService: HookupsAffairsService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.fillAllArticles();
  }
  fillAllArticles() {
    //get title parameter
    this.subscript = this.activeRoute.paramMap
      .subscribe(params => {
        this.title = params.get('title').split('-').join(' ');
      });
    //fill the main list
    this.listSubscribe = this.HookupsAffairsService.getList()
      .subscribe((data) => {
        this.HookupsAffairsService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.HookupsAffairsService.getByTitle(this.articles, this.title);
              if (this.TagsResourcesObject === undefined) {
                this.router.navigate(['/Error']);
              }
              this.fillReadthisAndRelatedArticles(this.title, this.articles);
              this.arrayLength = this.articles.length;
            }
          });
      }, (error: AppErrorHandler) => {
        throw error;
      });
  }
  fillReadthisAndRelatedArticles(title: string, list: any[]) {
    //clear lists
    this.HookupsAffairsService.clearList(this.readThisList);
    this.HookupsAffairsService.clearList(this.articlesList);
    this.HookupsAffairsService.clearList(this.extraList);
    this.extraList = this.HookupsAffairsService.getReadthisAndRelatedArticles(list, title).reverse();
    //fill read this articles
    for (var i = 0; i < 2; i++) {
      this.readThisList.push(this.extraList[i]);
    }
    //fill related articles
    for (var o = 2; o < 7; o++) {
      this.articlesList.push(this.extraList[o]);
    }
  }
  ngOnDestroy() {
    if (this.subscript) this.subscript.unsubscribe();
    if (this.listSubscribe) this.listSubscribe.unsubscribe();
  }
}
