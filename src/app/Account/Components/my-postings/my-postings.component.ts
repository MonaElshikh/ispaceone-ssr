import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ArticlesListService } from '../../Services/articles-list.service';
import { ErrorHandlerService } from 'Shared/Services/error-handler.service';
import { MyArticlesListService } from '../../Services/my-articles-list.service';
import { MyArticlesLikesService } from '../../Services/my-articles-likes.service';
import { MyArticlesTrakingService } from '../../Services/my-articles-traking.service';
import { MyArticlesCommentsService } from '../../Services/my-articles-comments.service'
import { AuthService } from 'Shared/Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { appArticleCategories, appArticleList } from '../../models/ArticleDescription';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaDefinition } from '@angular/platform-browser';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-my-postings',
  templateUrl: './my-postings.component.html',
  styleUrls: ['./my-postings.component.css']
})
export class MyPostingsComponent implements OnInit, OnDestroy {
  title: string = "";
  Count: number = 0;
  userId;
  MyPostingsCount: number = 0;
  PostingLikesCount: number = 0;
  PostingTrackingCount: number = 0;
  PostingCommentsCount: number = 0;
  errorMessage: string = ""
  articleList: appArticleList[] = [];
  placeHolderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  viewMode: string;
  PostingsCount: number = 0;
  DataLoading = true;
  isGalleryView = true;
  isListView = false;
  url = "/Posting/";
  myPostings = false;
  postingLikes = false;
  postingTrackings = false;
  postingComments = false;
  isMyPostingsList = false;
  articleCategories: appArticleCategories[] = [];
  CategoryNames: string[] = [];
  CategoryLinks: string[] = [];
  CategoryIds: number[] = [];
  pageOfItems: Array<any> = [];
  metaTags: MetaDefinition[] = [];
  subscription: Subscription;
  articlesCatSubscription: Subscription;
  constructor(
    public postingService: ArticlesListService,
    private route: Router,
    private errorHandler: ErrorHandlerService,
    public authService: AuthService,
    private MyArticlesListService: MyArticlesListService,
    private MyArticlesLikesService: MyArticlesLikesService,
    private MyArticlesTrakingService: MyArticlesTrakingService,
    private MyArticlesCommentsService: MyArticlesCommentsService,
    private spinner: NgxSpinnerService,
    private meta: MetaTagslService,
    private activeRoute: ActivatedRoute,
    private Toastr: ToastrService,
    private localStorage: LocalstorageService,
    @Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.loadPostings("mypostings");
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "My Postings | ispace1" },
      { name: 'description', content: "My Postings" },
    ];
    this.meta.SetPageTitle("My Postings | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  async bindArticlesList(filter: string) {
    let status = this.activeRoute.snapshot.queryParams["status"];
    if (status) {
      status === "s" ? this.Toastr.success("Article Saved Successfuly") : "";
    }
    //Get the current logged in user
    if (this.localStorage.getItem('Id')) {
      this.userId = this.localStorage.getItem('Id');
    }
    //clear the article list 
    if (this.articleList.length > 0) {
      this.articleList.length = 0;
    }
    switch (filter) {
      case 'mylist':
        const data = { User_Id: this.userId, LockUnlock: 0 };
        this.subscription = (await this.MyArticlesListService.create(data))
          .subscribe((result: any) => {
            if (result) {
              this.articleList = result;
              this.Count = this.articleList.length;
              console.log("my Postings result length>> " + result.length);
              console.log("my postings articleList length>> " + this.articleList.length);
              console.log("count>> " + this.Count);
              this.isMyPostingsList = true;
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'likeslist':
        this.subscription = (await this.MyArticlesLikesService.getById(this.userId))
          .subscribe((result: any) => {
            if (result) {
              this.articleList = result;
              this.isMyPostingsList = false;
              this.Count = this.articleList.length;
              console.log(this.articleList[0]);
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'trakinglist':
        this.subscription = (await this.MyArticlesTrakingService.getById(this.userId))
          .subscribe((result: any) => {
            if (result) {
              this.articleList = result;
              this.isMyPostingsList = false;
              this.Count = this.articleList.length;
              console.log(this.articleList[0]);
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'commentslist':
        this.subscription = (await this.MyArticlesCommentsService.getById(this.userId))
          .subscribe((result: any) => {
            if (result) {
              this.articleList = result;
              this.isMyPostingsList = false;
              this.Count = this.articleList.length;
              console.log(this.articleList[0]);
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
    }
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
  loadPostings(btnName: string) {
    switch (btnName) {
      case 'mypostings':
        this.myPostings = true;
        this.postingLikes = false;
        this.postingComments = false;
        this.postingTrackings = false;
        this.title = "My Postings";
        this.bindArticlesList('mylist');
        break;
      case 'postingLikes':
        this.postingLikes = true;
        this.myPostings = false;
        this.postingComments = false;
        this.postingTrackings = false;
        this.title = "Postings Likes";
        this.bindArticlesList('likeslist');
        break;
      case 'postingComments':
        this.postingComments = true;
        this.myPostings = false;
        this.postingLikes = false;
        this.postingTrackings = false;
        this.title = "Postings Comments";
        this.bindArticlesList('commentslist');
        break;
      case 'postingTrackings':
        this.postingTrackings = true;
        this.myPostings = false;
        this.postingLikes = false;
        this.postingComments = false;
        this.title = "Postings Loves";
        this.bindArticlesList('trakinglist');
        break;
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.articlesCatSubscription) this.articlesCatSubscription.unsubscribe();
  }
}
