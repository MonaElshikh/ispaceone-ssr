import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { appTagsResources } from 'TagsResources/models/tags-resources';

import { LoveRomanceService } from '../../Services/love-romance.service';

@Component({
  selector: 'app-love-romance',
  templateUrl: './love-romance.component.html',
  styleUrls: ['./love-romance.component.css']
})
export class LoveRomanceComponent implements OnInit, OnDestroy {
  constructor(
    private loveRomanceService: LoveRomanceService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private meta: MetaTagslService
  ) { }
  subscribtion: Subscription;
  subscript: Subscription;
  listSubscribe: Subscription;
  TagsResourcesObject: appTagsResources = {} as appTagsResources;
  articlesList: any = [];
  FakArray: any = [];
  articles: any = [];
  readThisList: any = [];
  extraList = [];
  metaTags: MetaDefinition[] = [];
  arrayLength: number;
  title: string = "";
  randomImageUrl = "";
  PageTitle = "";
  IsList = true;
  url = "/Love-Romance/";
  menuUrl = "/Tags";
  header = "Love & Romance – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Love & Romance.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.subscript = this.activeRoute.paramMap
      .subscribe(params => {
        this.title = params.get('title');
        if (this.title) {
          this.IsList = false
          console.log("details page, title>> " + this.title);
          this.title = this.title.split('-').join(' ');
          this.fillAllArticles();
        }
        else {
          this.IsList = true;
          console.log("List page");
          this.fillArticleList();
        }
      });
  }
  fillArticleList() {
    this.loveRomanceService.clearList(this.articlesList);
    this.subscribtion = this.loveRomanceService.getList()
      .subscribe((data) => {
        this.loveRomanceService.parseXML(data)
          .then((data) => {
            this.articlesList = data;

          });
      });
  }
  fillAllArticles() {
    this.listSubscribe = this.loveRomanceService.getList()
      .subscribe((data) => {
        this.loveRomanceService.parseXML(data)
          .then((data) => {
              this.articles = data;
              //get the current article, readthis and related articles
              if (this.title) {
                let cat = this.url.replace("/", "").replace("/", "");
                this.randomImageUrl = this.loveRomanceService.getRandomImage(cat);
                this.TagsResourcesObject = this.loveRomanceService.getByTitle(this.articles, this.title);
                if (this.TagsResourcesObject === undefined) {
                  this.route.navigate(['/Error']);
                }
                this.fillReadthisAndRelatedArticles(this.title, this.articles);
                this.arrayLength = this.articles.length;
              }
          });
      }, (error) => {
        throw error;
      });
  }
  fillReadthisAndRelatedArticles(title: string, list: any[]) {
    //clear lists
    this.loveRomanceService.clearList(this.readThisList);
    this.loveRomanceService.clearList(this.articlesList);
    this.loveRomanceService.clearList(this.extraList);
    this.extraList = this.loveRomanceService.getReadthisAndRelatedArticles(list, title).reverse();
    //fill read this articles
    for (var i = 0; i < 2; i++) {
      this.readThisList.push(this.extraList[i]);
    }
    //fill related articles
    for (var o = 2; o < 7; o++) {
      this.articlesList.push(this.extraList[o]);
    }
  }
  // // Generate Fake Object Array
  public generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      this.FakArray.push(i);
    }
    return indexes;
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
    if (this.subscript) this.subscript.unsubscribe();
    if (this.listSubscribe) this.listSubscribe.unsubscribe();
  }
}
