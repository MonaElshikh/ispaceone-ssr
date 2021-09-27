import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { GaysLesbiansService } from '../../Services/gays-lesbians.service';

@Component({
  selector: 'app-gays-lesbians-details',
  templateUrl: './gays-lesbians-details.component.html',
  styleUrls: ['./gays-lesbians-details.component.css']
})
export class GaysLesbiansDetailsComponent implements OnInit , OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Gays & Lesbians – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Gays-Lesbians/';
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
    private GaysLesbiansService: GaysLesbiansService,
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
    this.listSubscribe = this.GaysLesbiansService.getList()
      .subscribe((data) => {
        this.GaysLesbiansService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.GaysLesbiansService.getByTitle(this.articles, this.title);
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
    this.GaysLesbiansService.clearList(this.readThisList);
    this.GaysLesbiansService.clearList(this.articlesList);
    this.GaysLesbiansService.clearList(this.extraList);
    this.extraList = this.GaysLesbiansService.getReadthisAndRelatedArticles(list ,title).reverse();
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
   if(this.subscript) this.subscript.unsubscribe();
   if(this.listSubscribe) this.listSubscribe.unsubscribe();
  }
}
