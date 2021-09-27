import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'Shared/Services/error-handler.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { ProfileService } from '../../Services/profile-service.service';
import { ProfileViewersService } from '../../Services/profile-viewers.service';
import { ProfileViewsService } from '../../Services/profile-views.service';
import { ProfilesFavMeService } from '../../Services/profiles-fav-me.service';
import { ProfilesFavoritedService } from '../../Services/profiles-favorited.service';
import { ProfilesILikedService } from '../../Services/profiles-iliked.service';
import { ProfilesLikedMeService } from '../../Services/profiles-liked-me.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit, OnDestroy {
  title = "Likes";
  isLikes = true;
  isFavs = false;
  isViewers = false;
  isViews = false;
  isGalleryView = true;
  isListView = false;
  likedYou = true;
  youliked;
  mutualLikes;
  favYou = true;
  isFirstLoad = false;
  DataLoading = true;
  youFav;
  MutualFav;
  profileList: any[] = [];
  pageOfItems: Array<any> = [];
  metaTags: MetaDefinition[] = [];
  placeHolderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  profileId;
  errorMessage = "";
  LikesMeCount = 0;
  MeLikesCount = 0;
  MutualLikesCount = 0;
  FavmeCount = 0
  MeFavCount = 0;
  MutualFavCount = 0;
  ViewsCount = 0;
  ViewresCount = 0;
  baseUrl = "";
  subscription: Subscription;
  constructor(
    public ProfilesLikedMeService: ProfilesLikedMeService,
    public ProfilesILikedService: ProfilesILikedService,
    private errorHandler: ErrorHandlerService,
    private ProfilesFavMeService: ProfilesFavMeService,
    private ProfilesFavoritedService: ProfilesFavoritedService,
    private ProfileViewsService: ProfileViewsService,
    private ProfileViewersService: ProfileViewersService,
    private ProfileService: ProfileService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private localStorage: LocalstorageService,
    private meta: MetaTagslService,
    @Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit(): void {
    if (this.localStorage.getItem('ProfileId')) {
      this.profileId = this.localStorage.getItem('ProfileId');
    }
    this.isFirstLoad = true;
    this.loadIntersts('favoritedyou');
    this.loadIntersts('youfavorited');
    this.loadIntersts('mutualFavorites');
    this.loadIntersts('youliked');
    this.loadIntersts('mutualLikes');
    this.loadIntersts('likedYou');
    this.SetMetaTags();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Profile Interests | ispace1" },
      { name: 'description', content: "Profile Interests at ispace1" },
    ];
    this.meta.SetPageTitle("Profile Interests | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  goProfile(uname: string) {
    this.router.navigate(['/Profile/', uname]);
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
  }
  toggleTabs(tabName: string) {
    this.ClearStyles();
    this.isFirstLoad = false;
    switch (tabName) {
      case 'likes':
        this.isLikes = true;
        this.isFavs = false;
        this.isViewers = false;
        this.isViews = false;
        this.likedYou = true;
        this.title = "Likes";
        this.bindData("likedYou");
        break;
      case 'favorites':
        this.isFavs = true;
        this.isLikes = false;
        this.isViewers = false;
        this.isViews = false;
        this.favYou = true;
        this.title = "Loves";
        this.bindData("favoritedyou");
        break;
      case 'viewers':
        this.isViewers = true;
        this.isFavs = false;
        this.isLikes = false;
        this.isViews = false;
        this.title = "Viewers";
        this.bindData("viewers");
        break;
      case 'views':
        this.isViews = true;
        this.isFavs = false;
        this.isLikes = false;
        this.isViewers = false;
        this.isViewers = false;
        this.title = "Views";
        this.bindData("views");
        break;
    }
  }
  loadIntersts(btnName: string, setIsFirstLoad?: boolean) {
    if (setIsFirstLoad) { this.isFirstLoad = false; }
    this.ClearStyles();
    switch (btnName) {
      case 'likedYou':
        this.likedYou = true;
        this.bindData("likedYou");
        break;
      case 'youliked':
        this.youliked = true;
        this.bindData("youliked");
        break;
      case 'mutualLikes':
        this.mutualLikes = true;
        this.bindData("mutualLikes");
        break;
      case 'favoritedyou':
        this.favYou = true;
        this.bindData("favoritedyou");
        break;
      case 'youfavorited':
        this.youFav = true;
        this.bindData("youfavorited");
        break;
      case 'mutualFavorites':
        this.MutualFav = true;
        this.bindData("mutualFavorites");
        break;
      case 'viewers':
        this.bindData("viewers");
        break;
      case 'views':
        this.bindData("views");
        break;
    }
  }
  async bindData(type: string) {
    //Clear the profile list
    this.profileList.length = 0;
    this.spinner.show();
    switch (type) {
      case 'likedYou':
        this.subscription = (await this.ProfilesLikedMeService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              this.profileList = result;
              this.LikesMeCount = this.profileList.length;
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'youliked':
        this.subscription = (await this.ProfilesILikedService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              if (!this.isFirstLoad) {
                this.profileList = result;
                this.DataLoading = false;
              }
              this.MeLikesCount = result.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case "mutualLikes":
        this.subscription = (await this.ProfileService.GetProfileMutualLikes(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              if (!this.isFirstLoad) {
                this.profileList = result;
                this.DataLoading = false;
              }
              this.MutualLikesCount = result.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'favoritedyou':
        this.subscription = (await this.ProfilesFavMeService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              if (!this.isFirstLoad) {
                this.profileList = result;
                this.DataLoading = false;
              }
              this.FavmeCount = result.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'youfavorited':
        this.subscription = (await this.ProfilesFavoritedService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              if (!this.isFirstLoad) {
                this.profileList = result;
                this.DataLoading = false;
              }
              this.MeFavCount = result.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage
          });
        break;
      case "mutualFavorites":
        this.subscription = (await this.ProfileService.GetProfileMutualFavourites(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              if (!this.isFirstLoad) {
                this.profileList = result;
                this.DataLoading = false;
              }
              this.MutualFavCount = result.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage
          });
        break;
      case 'viewers':
        this.subscription = (await this.ProfileViewersService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              this.profileList = result;
              this.ViewresCount = result.length;
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'views':
        this.subscription = (await this.ProfileViewsService.getById(this.profileId))
          .subscribe((result: any) => {
            if (result) {
              this.profileList = result;
              this.ViewsCount = result.length;
              this.DataLoading = false;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
    }
    this.spinner.hide();
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  public CalculateAge(dob) {
    if (dob) {
      var timeDiff = Math.abs(Date.now() - dob);
      //Used Math.floor instead of Math.ceil
      //so 26 years and 140 days would be considered as 26, not 27.
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
  }
  ClearStyles() {
    this.likedYou = false;
    this.youliked = false;
    this.mutualLikes = false;
    this.favYou = false;
    this.youFav = false;
    this.MutualFav = false;
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
