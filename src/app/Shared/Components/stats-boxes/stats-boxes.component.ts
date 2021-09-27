import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { ArticleDescriptionService } from '../../../Account/Services/article-description.service';
import { ProfileService } from '../../../Account/Services/profile-service.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { MessagesService } from '../../../Account/Services/messages.service';
@Component({
  selector: 'app-stats-boxes',
  templateUrl: './stats-boxes.component.html',
  styleUrls: ['./stats-boxes.component.css']
})
export class StatsBoxesComponent {
  constructor(private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private MessagesService: MessagesService
    , private ProfileService: ProfileService
    , private ArticleDescriptionService: ArticleDescriptionService) {
  }
  isStatsBoxesExpand: boolean = false;
  showHideStatsBoxes: boolean = true;
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
  @Input() limits: appLimits = {} as appLimits;
  @Input() upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  articleLikeFavCommentObject = { Uname: "" };
  CheckCreditsSubscription: Subscription;
  toggleStatsBoxes() {
    this.isStatsBoxesExpand = !this.isStatsBoxesExpand;
    this.SetLimits();
  }
  SetLimits() {
    //Set current user uName
    this.articleLikeFavCommentObject.Uname === ""
      ? this.articleLikeFavCommentObject.Uname = this.ArticleDescriptionService.getUname()
      : this.articleLikeFavCommentObject.Uname = this.articleLikeFavCommentObject.Uname;
    //Set admin settings
    this.DailyLimits === 0
      ? this.DailyLimits = this.LimitsAndUpgradeService.GetLimits("daily", this.limits, this.upgrade)
      : this.DailyLimits = this.DailyLimits;
    this.MonthlyLimits === 0
      ? this.MonthlyLimits = this.LimitsAndUpgradeService.GetLimits("monthly", this.limits, this.upgrade)
      : this.MonthlyLimits = this.MonthlyLimits;
    this.LiftimeLimits === 0
      ? this.LiftimeLimits = this.LimitsAndUpgradeService.GetLimits("lifetime", this.limits, this.upgrade)
      : this.LiftimeLimits = this.LiftimeLimits;
    //get user credits
    //1- messages
    this.CheckCreditsSubscription = this.MessagesService.CheckMessageCredit(this.MessagesService.getProfileId())
      .subscribe((result: any) => {
        this.messageCredits === 0 ? this.messageCredits = result.length : this.messageCredits = this.messageCredits;
      });
    //2-photos
    this.CheckCreditsSubscription = this.ProfileService.GetProfilePhotosCredit(this.ProfileService.getProfileId())
      .subscribe((result: any) => {
        this.photosCredits === 0 ? this.photosCredits = result.length : this.photosCredits = this.photosCredits;
      });
    //3-likes
    this.CheckCreditsSubscription = this.ProfileService.GetProfileLikesCredit(this.ProfileService.getProfileId())
      .subscribe((result: any) => {
        this.likesCredits === 0 ? this.likesCredits = result.length : this.likesCredits = this.likesCredits;
      });
    //4-favs
    this.CheckCreditsSubscription = this.ProfileService.GetProfileFavouritsCredit(this.ProfileService.getProfileId())
      .subscribe((result: any) => {
        this.favsCredits === 0 ? this.favsCredits = result.length : this.favsCredits = this.favsCredits;
      });
    //5-blocks
    this.CheckCreditsSubscription = this.ProfileService.GetProfileBlockCredit(this.ProfileService.getProfileId())
      .subscribe((result: any) => {
        this.blockCredits === 0 ? this.blockCredits = result.length : this.blockCredits = this.blockCredits;
      });
    //6- reports
    this.CheckCreditsSubscription = this.ProfileService.GetProfileReportCredit(this.ProfileService.getProfileId())
      .subscribe((result: any) => {
        this.reportCredits === 0 ? this.reportCredits = result.length : this.reportCredits = this.reportCredits;
      });
    //7- Articles
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticlesCredit(this.ArticleDescriptionService.getProfileId())
      .subscribe((result: any) => {
        this.articleCredits === 0 ? this.articleCredits = result.length : this.articleCredits = this.articleCredits;
      });
    //8-Article likes
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticleLikeCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        this.articleLikesCredits === 0 ? this.articleLikesCredits = result.length : this.articleLikesCredits = this.articleLikesCredits;
      });
    //9-Article Tracks
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticleTrackingCredit(+this.ArticleDescriptionService.getProfileId())
      .subscribe((result: any) => {
        this.articleTracks === 0 ? this.articleTracks = result.length : this.articleTracks = this.articleTracks;
      });
    //10-Article comments
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticleCommentsCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        this.articleCommentsCredits === 0
          ? this.articleCommentsCredits = result.length
          : this.articleCommentsCredits = this.articleCommentsCredits;
      });
    //11-Article comments like
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticleLikeCommentsCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        this.articleCommentLikesCredits === 0
          ? this.articleCommentLikesCredits = result.length
          : this.articleCommentLikesCredits = this.articleCommentLikesCredits;
      });
  }
}

