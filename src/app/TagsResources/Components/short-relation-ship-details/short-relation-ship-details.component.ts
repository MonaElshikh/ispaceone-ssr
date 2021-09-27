import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { ShortRelationShipService } from '../../Services/short-relation-ship.service';

@Component({
  selector: 'app-short-relation-ship-details',
  templateUrl: './short-relation-ship-details.component.html',
  styleUrls: ['./short-relation-ship-details.component.css']
})
export class ShortRelationShipDetailsComponent implements OnInit , OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Short Relationship – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Short-Relationship/';
  menuUrl="/Resources";
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles: any = [];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe: Subscription;
  constructor(
    private ShortRelationShipService: ShortRelationShipService,
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
    this.listSubscribe = this.ShortRelationShipService.getList()
      .subscribe((data) => {
        this.ShortRelationShipService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.ShortRelationShipService.getByTitle(this.articles, this.title);
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
    this.ShortRelationShipService.clearList(this.readThisList);
    this.ShortRelationShipService.clearList(this.articlesList);
    this.ShortRelationShipService.clearList(this.extraList);
    this.extraList = this.ShortRelationShipService.getReadthisAndRelatedArticles(list ,title).reverse();
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
