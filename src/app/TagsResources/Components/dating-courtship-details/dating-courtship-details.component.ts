import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { DatingCourtshipService } from '../../Services/dating-courtship.service';

@Component({
  selector: 'app-dating-courtship-details',
  templateUrl: './dating-courtship-details.component.html',
  styleUrls: ['./dating-courtship-details.component.css']
})
export class DatingCourtshipDetailsComponent implements OnInit, OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Dating & Courtship – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Dating-Courtship/';
  menuUrl = "/Tags";
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles: any = [];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe: Subscription;
  constructor(
    private DatingCourtshipService: DatingCourtshipService,
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
    this.listSubscribe = this.DatingCourtshipService.getList()
      .subscribe((data) => {
        this.DatingCourtshipService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.DatingCourtshipService.getByTitle(this.articles, this.title);
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
    this.DatingCourtshipService.clearList(this.readThisList);
    this.DatingCourtshipService.clearList(this.articlesList);
    this.DatingCourtshipService.clearList(this.extraList);
    this.extraList = this.DatingCourtshipService.getReadthisAndRelatedArticles(list, title).reverse();
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
