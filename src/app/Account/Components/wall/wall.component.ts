import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { MessagesService } from '../../Services/messages.service';
import { ProfileService } from '../../Services/profile-service.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnDestroy {
  limits: appLimits = {} as appLimits;
  upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  articleLikeFavCommentObject = { Uname: "" };
  DailyLimits: number = 0;
  MonthlyLimits: number = 0;
  LiftimeLimits: number = 0;
  messageCredits: number = 0;
  photosCredits: number = 0;
  likesCredits: number = 0;
  favsCredits: number = 0;
  blockCredits: number = 0;
  reportCredits: number = 0;
  articleCredits: number = 0;
  articleLikesCredits: number = 0;
  articleTracks: number = 0;
  articleCommentsCredits: number = 0;
  articleCommentLikesCredits: number = 0;
  showAccountSuggestionBox: boolean = true;
  mainAccountSuggestionBox: Boolean = true;
  updateAccountSuggestionBox: boolean = false;
  uploadAccountSuggestionBox: boolean = false;
  messagesAccountSuggestionBox: boolean = false;
  interestsAccountSuggestionBox: boolean = false;
  upgradeAccountSuggestionBox: boolean = false;
  additionalProdAccountSuggestionBox: boolean = false;
  metaTags: MetaDefinition[] = [];
  ShowLimitsBox: boolean = false;
  paramSubscription: Subscription;
  LimitsSubscription: Subscription;
  current = 0;
  ProfileId: number;
  constructor(
    private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private ProfileService: ProfileService
    , public MessagesService: MessagesService
    , private meta: MetaTagslService
    , private ActivateRoute: ActivatedRoute
    , private route: Router
  ) {
  }
  ngOnInit(): void {
    //Check user name if not right redirect to error page.
    let uName = "";
    this.paramSubscription = this.ActivateRoute.params
      .subscribe(params => {
        uName = params['UserName'];
        console.log("user name from route> " + uName);
        console.log("user name from local storage> " + this.ProfileService.getUname());
        if (uName !== this.ProfileService.getUname()) {
          this.route.navigate(['/Error']);
        }
      });
    this.UpdateLastLoginDate();
    this.SetMetaTags();
  }
  ngOnDestroy() {
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
    if (this.paramSubscription) this.paramSubscription.unsubscribe();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Welcome | ispace1" },
      { name: 'description', content: "Home Page at ispace1" }
    ];
    this.meta.SetPageTitle("Welcome | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  UpdateLastLoginDate() {
    this.ProfileId = + this.LimitsAndUpgradeService.getProfileId();
    this.LimitsSubscription = this.ProfileService.UpdateLastloginDate(this.ProfileId)
      .subscribe(() => {
      });
  }
  onPrev() {
    this.current == 0 ? this.current = 6 : this.current--;
    this.navigate(this.current);
  }
  onNext() {
    this.current == 6 ? this.current = 0 : this.current++;
    this.navigate(this.current);
  }
  ///Navigate between account suggestion boxes with next previous_ Mona.Elshikh_10-25-2020
  navigate(currentBox: number) {
    switch (currentBox) {
      case 0:
        this.mainAccountSuggestionBox = true;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 1:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = true;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 2:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = true;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 3:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = true;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 4:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = true;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 5:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = true;
        this.additionalProdAccountSuggestionBox = false;
        break;
      case 6:
        this.mainAccountSuggestionBox = false;
        this.updateAccountSuggestionBox = false;
        this.uploadAccountSuggestionBox = false;
        this.messagesAccountSuggestionBox = false;
        this.interestsAccountSuggestionBox = false;
        this.upgradeAccountSuggestionBox = false;
        this.additionalProdAccountSuggestionBox = true;
        break;
    }
  }
}
