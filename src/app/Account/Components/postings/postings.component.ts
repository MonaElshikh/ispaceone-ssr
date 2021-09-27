import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { appArticleCategories, appArticleList } from '../../models/ArticleDescription';
import { ArticlesListService } from '../../Services/articles-list.service';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.css']
})
export class PostingsComponent implements OnInit, OnDestroy {
  userId;
  MyPostingsCount: number = 0;
  PostingLikesCount: number = 0;
  PostingTrackingCount: number = 0;
  PostingCommentsCount: number = 0;
  selected = [];
  errorMessage: string = ""
  articleList: appArticleList[] = [];
  viewMode: string;
  PostingsCount: number = 0;
  isGalleryView = true;
  isListView = false;
  isKeywordsCollapse = true;
  allCategories = true;
  url = "/Posting/";
  Mode = 1;
  SearchKeyword = "";
  myPostings = false;
  postingLikes = false;
  postingTrackings = false;
  postingComments = false;
  isMyPostingsList = false;
  isForbidden = false;
  DataLoading = true;
  articleCategories: appArticleCategories[] = [];
  CategoryNames: string[] = [];
  CategoryLinks: string[] = [];
  CategoryIds: number[] = [];
  pageOfItems: Array<any> = [];
  placeHolderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  catName = "";
  metaTags: MetaDefinition[] = [];
  subscription: Subscription;
  articlesCatSubscription: Subscription;
  constructor(
    public postingService: ArticlesListService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private meta: MetaTagslService,
    private activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit(): void {
    this.LoadArticles();
    this.SetMetaTags();
  }
  toggle(boxName: string) {
    switch (boxName) {
      case "keywords":
        this.isKeywordsCollapse = !this.isKeywordsCollapse;
        break;
    }
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Postings - All Postings | ispace1" },
      { name: 'description', content: "Postings - All Postings" },
    ];
    this.meta.SetPageTitle("Postings - All Postings | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  LoadArticles() {
    let catId = this.activeRoute.snapshot.queryParams["catid"];
    if (catId) {
      this.GetArticlesByCatId(catId, true);
    }
    else {
      this.bindArticlesList();
    }
  }
  OnChangeSelection(event) {
    this.Mode = +event.target.value;
    console.log("Selected value>> " + this.Mode);
    this.bindArticlesList();
  }
  SearchArticles() {
    console.log("search key is >> " + this.SearchKeyword);
    this.bindArticlesList();
  }
  async bindArticlesList() {
    let status = this.activeRoute.snapshot.queryParams["status"];
    if (status && status === "f") {
      this.isForbidden = true;
    }
    else {
      this.isForbidden = false;
    }
    //clear the article list 
    if (this.articleList.length > 0) {
      this.articleList.length = 0;
    }
    this.catName = "";
    this.allCategories = true;
    this.ClearLeftPanelStyle();
    let data = { ViewMode: this.Mode, SearchKeyWord: this.SearchKeyword };
    console.log("Data ViewMode>>" + data.ViewMode + "/ " + " Data Keyword>> " + data.SearchKeyWord);
    this.subscription = (await this.postingService.create(data))
      .subscribe((result: any) => {
        if (result) {
          this.articleList = result;
          this.PostingsCount = this.articleList.length;
          this.isMyPostingsList = false;
          this.bindArticlesCategories(this.articleList);
          this.DataLoading = false;
        }
      });
  }
  changeMode(mode: string) {
    switch (mode) {
      case 'Gallery':
        this.isGalleryView = true;
        this.isListView = false;
        break;
      case 'List':
        this.isListView = true;
        this.isGalleryView = false;
        break;
    }
    console.log(this.viewMode);
  }
  openArticle(article: any) {
    if (article.header) {
      this.route.navigate([this.url, article.header.split(' ').join('-'), article.id]);
    }
  }
  bindArticlesCategories(articleList: appArticleList[]) {
    this.postingService.clearList(this.articleCategories);
    this.postingService.clearList(this.CategoryIds);
    this.postingService.clearList(this.CategoryNames);
    this.postingService.clearList(this.CategoryLinks);
    if (this.articleList && this.articleList != undefined) {
      for (var i = 0; i < articleList.length; i++) {
        if (this.CategoryNames.indexOf(this.articleList[i].category) == -1) {
          this.CategoryIds.push(this.articleList[i].cat_Id);
          this.CategoryNames.push(this.articleList[i].category);
          this.CategoryLinks.push("/" + this.articleList[i].category.replace(/\s/g, "").replace("&", "-"));
          console.log("cat id from adding loop>> " + this.CategoryIds);
        }
      }
      for (var c = 0; c < this.CategoryNames.length; c++) {
        this.articleCategories.push({ catName: this.CategoryNames[c], catLink: this.CategoryLinks[c].replace("/Postings", ""), cat_Id: this.CategoryIds[c] });
        console.log(this.articleCategories[c].catName);
        console.log(this.articleCategories[c].cat_Id);
      }
    }
  }
  async GetArticlesByCatId(catId: number, fromArticleDescription?: boolean) {
    console.log("catId  >> " + catId);
    this.allCategories = false;
    this.articlesCatSubscription = (await this.postingService.GetArticlesByCategoryId(catId))
      .subscribe((result: any) => {
        if (result) {
          this.articleList = result;
          if (this.articleList && this.articleList != undefined) {
            for (let cat of this.articleList) {
              console.log("cat name>>" + cat.category);
            }
            this.PostingsCount = this.articleList.length;
            fromArticleDescription ? this.catName = this.articleList[0].category : this.catName = "";
          }
          this.DataLoading = false;
        }
      });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  setSelectedNode(rowIndex: number) {
    this.ClearLeftPanelStyle();
    this.selected[rowIndex] = !this.selected[rowIndex];
  }
  ClearLeftPanelStyle() {
    for (let i = 0; i < this.articleCategories.length; i++) {
      this.selected[i] = false;
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.articlesCatSubscription) this.articlesCatSubscription.unsubscribe();
  }
}
