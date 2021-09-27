import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { LifeStyleService } from '../../Services/life-style.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-life-style-details',
  templateUrl: './life-style-details.component.html',
  styleUrls: ['./life-style-details.component.css']
})
export class LifeStyleDetailsComponent implements OnInit, OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Life-Style – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Life-Style/';
  menuUrl="/Tags";
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles: any = [];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe: Subscription;
  constructor(
    private LifeStyleService: LifeStyleService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private metaService: MetaTagslService) {
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
    this.listSubscribe = this.LifeStyleService.getList()
      .subscribe((data) => {
        this.LifeStyleService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.LifeStyleService.getByTitle(this.articles, this.title);
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
    this.LifeStyleService.clearList(this.readThisList);
    this.LifeStyleService.clearList(this.articlesList);
    this.LifeStyleService.clearList(this.extraList);
    this.extraList = this.LifeStyleService.getReadthisAndRelatedArticles(list, title).reverse();
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
