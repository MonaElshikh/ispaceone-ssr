import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { AuthService } from 'Shared/Services/auth.service';
import { ConfirmDialogService } from 'Shared/Services/confirm-dialog.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { environment } from '../../../../environments/environment';
import {
  appArticleComments,
  appArticleCustomFields,
  appArticleDescription,
  appArticleLikeDislike,
  appArticleTrack,
  appBaseArticleComment,
  appCommentLikeDislike,
  appRelatedArticles,
} from '../../models/ArticleDescription';
import { appPostingCategories } from '../../models/posting-categories';
import { ArticleCommentsService } from '../../Services/article-comments.service';
import { ArticleDescriptionService } from '../../Services/article-description.service';
import { PostingServiceService } from '../../Services/posting-service.service';

@Component({
  selector: 'app-article-description',
  templateUrl: './article-description.component.html',
  styleUrls: ['./article-description.component.css']
})
export class ArticleDescriptionComponent implements OnInit, OnDestroy {
  //#region Declarations
  pdForm: NgForm;
  resizedImage = "";
  orientation: DOC_ORIENTATION;
  isPosterImageEdit = false;
  isLoadingImageError = false;
  isPosterImageSaveClicked = false;
  isPosterImageRemoveClicked = false;
  DataLoading = true;
  isSaved = false;
  hasPosterImage: boolean;
  loadingimageError = "";
  imageChangedEvent = "";
  croppedImage = "";
  fileExtension = "";
  updatedPosterImages = { imageBase64: "", imageExtention: "", PostingLargeImageUrl: "", id: 0 };
  reportedArticleObject = { Id: 0, Reporting: "" };
  isCommentLiked = [];
  commentLikeDisLike: appCommentLikeDislike = {} as appCommentLikeDislike;
  commentLikeDisLikeSentObject: appCommentLikeDislike = {} as appCommentLikeDislike;
  UserProfileImage = "";
  uName = "";
  articleLikeFavCommentObject = { Uname: "" };
  articleLikeDisLike: appArticleLikeDislike = {} as appArticleLikeDislike;
  articleLikeSource: appArticleLikeDislike = {} as appArticleLikeDislike;
  articleTrack: appArticleTrack = {} as appArticleTrack;
  articleTrackSource: appArticleTrack = {} as appArticleTrack;
  articleCommentSentObject: appArticleComments = {} as appArticleComments;
  errorMessage = "";
  articleLikesCount: number = 0;
  articleTracksCount: number = 0;
  deleteRecord = [];
  labels: number[] = [];
  values: number[] = [];
  metaTags: MetaDefinition[] = [];
  showedRecords: number = 0;
  limits: appLimits = {} as appLimits;
  upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  id; ArticleOwner = false; ArticleOwnerId;
  loggedInUserUname = "";
  updatedComment: appBaseArticleComment = {} as appBaseArticleComment;
  paramSubscription: Subscription;
  listSubscription: Subscription;
  ArticleSubscription: Subscription;
  articleCommentsSubscription: Subscription;
  articleCustomFieldsSubscripttion: Subscription;
  ArticleLikeSubscription: Subscription;
  ArticleTrackSubscription: Subscription;
  LimitsSubscription: Subscription;
  UpgradeSubscription: Subscription;
  LimitsCheckSubscription: Subscription;
  relatedPostingsSubscription: Subscription;
  article: appArticleDescription = {} as appArticleDescription;
  Checkarticle: appArticleDescription = {} as appArticleDescription;
  articleComments: appArticleComments[] = [];
  articleCustomFields: appArticleCustomFields[] = [];
  articleTitleRemainingChars: number = 0;
  articleCommentRemainingChars: number = 0;
  articleBodyRemainingChars: number = 0;
  articleTagsRemainingChars: number = 0;
  DailyLimit: number = 0;
  articleComment = "";
  ShownDescription = "";
  editComment = [];
  postingCategoriesList: appPostingCategories[] = [];
  hosturl = "";
  currentRoute = "";
  viewMore = false;
  editMode = false;
  isTitleEditMode = false;
  isCategoryEditMode = false;
  isBodyEditMode = false;
  isTagsEditMode = false;
  isCustomFieldsEditMode = false;
  showbtnEditPosterImg = false;
  tracked = false;
  liked = false;
  commentLiked = true;
  showExtraPostings = false;
  posterPhotoModified = false;
  allowComentsModified = false;
  commentStatus = "";
  fullRelatedPostingList: appRelatedArticles[] = [];
  mainPostingList: appRelatedArticles[] = [];
  extraPostingList: appRelatedArticles[] = [];
  //#endregion

  //#region  Events
  constructor(
    private postingServices: PostingServiceService
    , private activeRoute: ActivatedRoute
    , private router: Router
    , public articleDescription: ArticleDescriptionService
    , private ArticleCommentsService: ArticleCommentsService
    , public authService: AuthService
    , private imageCompress: NgxImageCompressService
    , private ConfirmDialogService: ConfirmDialogService
    , private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private Toster: ToastrService
    , private localStorage: LocalstorageService
    , private meta: MetaTagslService
    , private route: Router
  ) {
    this.currentRoute = this.router.url;
    this.hosturl = environment.HostUrl;
  }
  ngOnInit(): void {
    if (this.localStorage.getItem('UserId')) {
      this.loggedInUserUname = this.localStorage.getItem('UserId');
      this.UserProfileImage = this.localStorage.getItem('UserProfileImage');
      this.uName = this.localStorage.getItem('UserId');
    }
    // setTimeout(() => { 
    // }, 12000);
    this.getArticleId();
    this.getArticle();
    this.getArticleComments();
  }
  ngOnDestroy() {
    if (this.paramSubscription) this.paramSubscription.unsubscribe();
    if (this.listSubscription) this.listSubscription.unsubscribe();
    if (this.articleCustomFieldsSubscripttion) this.articleCustomFieldsSubscripttion.unsubscribe();
    if (this.articleCommentsSubscription) this.articleCommentsSubscription.unsubscribe();
    if (this.ArticleTrackSubscription) this.ArticleTrackSubscription.unsubscribe();
    if (this.ArticleLikeSubscription) this.ArticleLikeSubscription.unsubscribe();
    if (this.ArticleSubscription) this.ArticleSubscription.unsubscribe();
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
    if (this.LimitsCheckSubscription) this.LimitsCheckSubscription.unsubscribe();
    if (this.relatedPostingsSubscription) this.relatedPostingsSubscription.unsubscribe();
    this.CheckFormDirty();
  }
  //#endregion
  //#region Functions
  CheckFormDirty() {
    if (this.pdForm !== null && this.pdForm !== undefined) {
      let dirty = false;
      console.log("is form dirty>> " + this.pdForm.dirty);
      if ((this.pdForm.dirty && !this.isSaved)
        || this.allowComentsModified
        || this.posterPhotoModified) {
        dirty = true;
      }
      if (dirty) {
        this.ConfirmDialogService.confirm("Leave Page?", "You have made changes without saving them.", "Save", "Discard", "sm")
          .then((confirmed) => {
            if (confirmed) {
              this.savePostings('save', false);
              if (this.posterPhotoModified) {
                this.SavePostingPoster('save', false);
              }
              dirty = false;
              this.Toster.success("Saved Successfuly");
            }
          });
      }
    }
  }
  SetPostDescriptionForm(frm: NgForm) {
    if (this.pdForm === null || this.pdForm === undefined) {
      this.pdForm = frm;
    }
  }
  checkArticleOwner(articleOwnerId) {
    if (this.authService.isLoggedIn()) {
      //Get Limits
      this.GetAdminSettingsAndUpgrade();
      //set the uname for the curent logged in user
      this.articleLikeFavCommentObject.Uname = this.articleDescription.getUname();
      if (articleOwnerId === this.localStorage.getItem('Id')) {
        this.ArticleOwner = true;
      }
    }
  }
  getAllowCommentValue(event) {
    console.log("comment status>> " + event.target.value);
    this.article.commentStatus = event.target.value;
    this.commentStatus = this.article.commentStatus;
    this.allowComentsModified = true;
  }
  fillPostingCategories() {
    if (this.postingCategoriesList.length > 0) this.postingCategoriesList.length = 0;
    this.postingCategoriesList = this.postingServices.fillPostingCategories();
  }
  selectChange(event) {
    console.log(event);
    this.fillPostingCategories();
    for (var i = 0; i < this.postingCategoriesList.length; i++) {
      if (this.postingCategoriesList[i].categoryName === event) {
        this.article.catId = this.postingCategoriesList[i].categoryId;
        this.article.category = this.postingCategoriesList[i].categoryName;
        console.log('Catname>>' + this.article.category + ' / ' + 'Cat Id>> ' + this.article.catId);
      }
    }
  }
  getArticleId() {
    this.paramSubscription = this.activeRoute.paramMap
      .subscribe(params => {
        this.id = params.get('id');
      });
  }
  async getArticle(loadJustArticle?: boolean) {
    if (this.id) {
      this.listSubscription = (await this.articleDescription.getById(this.id))
        .subscribe((result: any) => {
          console.log("article id> " + result.id);
          this.Checkarticle = result;
          this.checkArticleOwner(this.Checkarticle.articleUserId);
          if (!this.ArticleOwner && this.Checkarticle.onllinStatus !== "Approved") {
            console.log("ArticleOwner>> " + this.ArticleOwner);
            console.log("onllinStatus>> " + this.Checkarticle.onllinStatus);
            this.router.navigate(['/Postings'], { queryParams: { status: 'f' } });
          }
          else {
            this.article = result;
            if (this.article.description.length <= 5000) {
              this.ShownDescription = this.article.description
              this.viewMore = false
            }
            else {
              this.ShownDescription = this.article.description.substring(0, 5000) + " ...";
              this.viewMore = true;
            }
            this.commentStatus = this.article.commentStatus;
            console.log("Allow comment>> " + this.commentStatus);
            //Bind related articles
            this.BindRelatedPostings();
            //Bind Meta tags
            this.SetMetaTags();
            if (this.article.postingLargeImageUrl) {
              this.article.postingLargeImageUrl.indexOf("ispace1-stripe") != -1 ? this.hasPosterImage = false : this.hasPosterImage = true;
            }
            else {
              this.hasPosterImage = false;
            }
            if (loadJustArticle) {
              return;
            }
            else {
              this.BindArticleLikesCount();
              this.BindArticleTracksCount();
              if (this.authService.isLoggedIn()) {
                this.BindArticleLikes();
                this.BindArticleTracks();
                this.BindUsedChars();
              }
            }
          }
          this.DataLoading = false;
        }, () => {
          this.router.navigate(['/Error']);
        });
    }
  }
  ShowMoreLess() {
    if (this.viewMore) {
      this.ShownDescription = this.article.description;
      this.viewMore = false;
    }
    else {
      this.ShownDescription = this.article.description.substring(0, 5000) + " ...";
      this.viewMore = true;
    }
  }
  SetMetaTags() {
    this.meta.SetPageTitle(this.article.header + ", " + this.article.author + " | ispace1");
    this.metaTags =
      [
        { name: 'title', content: this.article.header + ", " + this.article.author + " | ispace1" },
        { name: 'description', content: this.article.header + " | Posted By " + this.article.uname + " | on " + this.article.timeCreated + " | Posted In " + this.article.category + " | ispace1" },
        { name: 'metaImage', content: this.articleDescription.bindImageUrl('posting', this.article.postingLargeImageUrl) }
      ];
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  //fun to get all Adming settings(limits)
  async GetAdminSettingsAndUpgrade() {
    this.LimitsSubscription = (await this.LimitsAndUpgradeService.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.limits = result[0];
        }
      });
    this.UpgradeSubscription = (await this.LimitsAndUpgradeService.getById(this.LimitsAndUpgradeService.getProfileId()))
      .subscribe((result: any) => {
        if (result) {
          this.upgrade = result[0];
        }
      });
  }
  GoToArticlesByCat(catId) {
    this.router.navigate(['/Postings'], { queryParams: { catid: catId } });
  }
  //fun to check user account type and return the limits accordsing to the action ex.. like/fav/send mesg etc
  CheckLimits() {
    this.DailyLimit = this.articleDescription.GetLimits("daily", this.limits, this.upgrade);
    console.log(" DailyLimit>> " + this.DailyLimit);
  }
  DeleteArticle(article: appArticleDescription) {
    this.ArticleSubscription = this.articleDescription.DeleteArticle(article)
      .subscribe(() => {
        console.log(article.id);
        console.log("Success");
        this.router.navigate(['/Postings']);

      }, (error) => {
        this.Toster.error("Delete Failed");
      });
  }
  BindUsedChars() {
    this.article.header ? this.articleTitleRemainingChars = this.article.header.length : this.articleTitleRemainingChars = 0;
    this.article.description ? this.articleBodyRemainingChars = this.article.description.length : this.articleBodyRemainingChars = 0;
    this.article.tag ? this.articleTagsRemainingChars = this.article.tag.length : this.articleTagsRemainingChars = 0;
  }
  toggelMode(mode: string) {
    switch (mode) {
      case 'edit':
        this.editMode = true;
        break
      case 'cancel':
        this.editMode = false;
        console.log('Edited article category >> ' + this.article.category);
        console.log('Edited article tag >> ' + this.article.tag);
        console.log('Edited article body >> ' + this.article.description);
        console.log('Edited article header >> ' + this.article.header);
        break;
    }
  }
  savePostings(mode: string, showToaster?: boolean) {
    this.ReplcaseMultipleSpacesLinesBreak("articleDescription");
    console.log("this.commentStatus from save >> " + this.article.commentStatus);
    switch (mode) {
      case 'save':
        this.editMode = false;
        this.article.video = "";
        this.article.picture = "";
        this.article.imageDescription = ""
        console.log("article.id " + this.article.id);
        console.log("article.header " + this.article.header);
        console.log("article.catId " + this.article.catId);
        console.log(" article.description " + this.article.description);
        console.log("article.video " + this.article.video);
        console.log("article.author " + this.article.author);
        console.log("article.picture" + this.article.picture);
        console.log("article.imageDescription " + this.article.imageDescription);
        console.log("article.status " + this.article.status);
        console.log(" article.commentStatus " + this.article.commentStatus);
        console.log("article.tag " + this.article.tag);
        console.log(" article.onllinStatus " + this.article.onllinStatus);
        this.ArticleSubscription = this.articleDescription.UpdateArticle(this.article)
          .subscribe(() => {
            if (showToaster) {
              this.Toster.success("Saved Successfuly");
              this.isSaved = true;
            }
            this.allowComentsModified = false;
          },
            () => {
              this.Toster.error("Update failed");
            });
        break
      case 'cancel':
        this.editMode = false;
        this.getArticle(true);
        break;
    }
  }
  SetArticleLikeDisLikeSentObject(IsInsert?: boolean) {
    this.articleLikeSource = {} as appArticleLikeDislike;
    this.articleLikeSource.aid = this.id;
    this.articleLikeSource.uname = this.localStorage.getItem("UserId");
    if (IsInsert) {
      this.articleLikeSource.likea = this.liked ? 0 : 1;
      this.articleLikeSource.dlikea = "0";
      this.articleLikeSource.date = new Date();
    }
    return this.articleLikeSource;
  }
  SetArticleTrackSentObject(IsInsert?: boolean) {
    this.articleTrackSource = {} as appArticleTrack;
    this.articleTrackSource.articleId = this.id;
    this.articleTrackSource.userId = +this.articleDescription.getProfileId();
    if (IsInsert) {
      this.articleTrackSource.ratingNo = 0;
    }
    return this.articleTrackSource;
  }
  BindArticleLikesCount() {
    this.ArticleLikeSubscription = this.articleDescription.GetArticleLikesCount(this.id)
      .subscribe((result: any) => {
        if (result) {
          this.articleLikesCount = result.length;
        }
      });
  }
  BindArticleTracksCount() {
    this.ArticleTrackSubscription = this.articleDescription.GetArticleTracksCount(this.id)
      .subscribe((result: any) => {
        if (result) {
          this.articleTracksCount = result.length;
        }
      });
  }
  BindArticleLikes() {
    this.ArticleLikeSubscription = this.articleDescription.IsArticleLiked(this.SetArticleLikeDisLikeSentObject())
      .subscribe((result: any) => {
        if (result) {
          this.articleLikeDisLike = result[0];
          if (this.articleLikeDisLike) {
            this.liked = true;
          }
          else {
            this.liked = false;
          }
        }
      });
  }
  BindArticleTracks() {
    this.ArticleTrackSubscription = this.articleDescription.IsArticleTracked(this.SetArticleTrackSentObject())
      .subscribe((result: any) => {
        if (result) {
          this.articleTrack = result[0];
          if (this.articleTrack) {
            this.tracked = true;
          } else {
            this.tracked = false;
          }
        }
      });
  }
  ArticleLike() {
    //Check limits
    this.LimitsCheckSubscription = this.articleDescription.GetArticleLikeCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            if (this.liked) {
              console.log(this.liked);
              this.ArticleLikeSubscription = this.articleDescription.DeleteArticleLike(this.SetArticleLikeDisLikeSentObject())
                .subscribe(() => {
                  console.log("Success");
                  this.BindArticleLikes();
                  this.BindArticleLikesCount();
                });
            }
            else {
              console.log(this.liked);
              this.ArticleLikeSubscription = this.articleDescription.ArticleLike(this.SetArticleLikeDisLikeSentObject(true))
                .subscribe(() => {
                  console.log("Success");
                  this.BindArticleLikes();
                  this.BindArticleLikesCount();
                });
            }
          }
          else {
            this.Toster.error("Limits Alert: You usesd all your credits.");
            return false;
          }
        }
      });
  }
  ArticleTrack() {
    //Check limits
    console.log("ProfileId>> " + this.articleDescription.getProfileId());
    this.LimitsCheckSubscription = this.articleDescription.GetArticleTrackingCredit(+this.articleDescription.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            if (this.tracked) {
              console.log(this.tracked);
              this.ArticleTrackSubscription = this.articleDescription.DeleteArticleTrack(this.SetArticleTrackSentObject())
                .subscribe(() => {
                  console.log("Success");
                  this.BindArticleTracks();
                  this.BindArticleTracksCount();
                });
            }
            else {
              this.ArticleTrackSubscription = this.articleDescription.ArticleTrack(this.SetArticleTrackSentObject(true))
                .subscribe(() => {
                  console.log("Success");
                  this.BindArticleTracks();
                  this.BindArticleTracksCount();
                });
            }
          }
          else {
            this.Toster.error("Limits Alert: You usesd all your credits.");
            return false;
          }
        }
      });
  }
  ReportArticle() {
    this.LimitsCheckSubscription = this.articleDescription.GetArticleAbuseCredit(this.articleDescription.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            this.ConfirmDialogService.confirm("Confirm Report", "Are you sure you want to report this article ?", "Yes", "Cancel", "sm")
              .then((confirmed) => {
                if (confirmed) {
                  console.log("Reported confirmed");
                  this.reportedArticleObject.Id = this.article.id;
                  this.reportedArticleObject.Reporting = "Abused";// "abuse_pending";
                  this.ArticleSubscription = this.articleDescription.UpdateArticleReporting(this.reportedArticleObject)
                    .subscribe((result: any) => {
                      if (result) {
                        console.log("reported success");
                        this.router.navigate(['/Postings']);
                      }
                    });
                }
              }).catch(() => {
                console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
              });
          }
          else {
            this.Toster.error("Limits Alert: You usesd all your credits.");
            return false;
          }
        }
      });

  }
  //#region  Related Postings
  showMorePostings() {
    this.showExtraPostings = !this.showExtraPostings;
  }
  BindRelatedPostings() {
    this.relatedPostingsSubscription = this.articleDescription.GetRelatedArticles(this.article.id)
      .subscribe((result: any) => {
        if (result) {
          this.fullRelatedPostingList = result;
          if (this.fullRelatedPostingList && this.fullRelatedPostingList !== undefined && this.fullRelatedPostingList.length > 0) {
            for (var i = 0; i < 4; i++) {
              this.mainPostingList.push(this.fullRelatedPostingList[i]);
            }
            for (var i = 4; i < 8; i++) {
              this.extraPostingList.push(this.fullRelatedPostingList[i]);
            }
          }
        }
      });
  }
  OpenArticle(article: appRelatedArticles) {
    if (article.header) {
      this.route.navigate(['/Posting/', article.header.split(' ').join('-'), article.id]);
    }
  }
  //#endregion
  //#region  Article Comments
  getArticleComments() {
    if (this.id) {
      this.articleCommentsSubscription = this.ArticleCommentsService.GetAllArticleComments(this.id)
        .subscribe((result: any) => {
          if (result) {
            this.articleComments = result;
          }
        });
    }
  }
  ReplcaseMultipleSpacesLinesBreak(commenttype: string) {
    switch (commenttype) {
      case 'addArticleComment':
        this.articleCommentSentObject.comments = this.articleCommentSentObject.comments.replace(/ {2,}/g, ' ').trim()
          .replace(/[\r\n]{3,}/g, "\n\n");
        break;
      case 'updateArticleComment':
        this.updatedComment.comments = this.updatedComment.comments.replace(/ {2,}/g, ' ').trim()
          .replace(/[\r\n]{3,}/g, "\n\n");
        break;
      case 'articleDescription':
        this.article.description = this.article.description.replace(/ {2,}/g, ' ').trim()
          .replace(/[\r\n]{3,}/g, "\n\n");
        break;
    }
  }
  AddArticleComment() {
    this.LimitsCheckSubscription = this.articleDescription.GetArticleCommentsCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            console.log(this.articleComment);
            this.articleCommentSentObject.articleId = this.id;
            this.articleCommentSentObject.comments = this.articleComment;
            this.articleCommentSentObject.uname = this.ArticleCommentsService.getUname();
            this.articleCommentSentObject.name = this.ArticleCommentsService.getSname();
            this.articleCommentSentObject.emailId = this.localStorage.getItem("EmailId");
            this.articleCommentSentObject.timeCreated = new Date();
            this.articleCommentSentObject.status = "No";
            this.articleCommentSentObject.isEdited = false;
            this.ReplcaseMultipleSpacesLinesBreak('addArticleComment');
            this.articleCommentsSubscription = this.ArticleCommentsService.AddArticleComment(this.articleCommentSentObject)
              .subscribe(() => {
                this.articleComment = "";
                this.getArticleComments();
                this.Toster.success("Posted Successfuly");
              }, () => {
                this.Toster.error("Post failed");
              });
          }
          else {
            this.Toster.error("Limits Alert: You usesd all your credits.");
            return false;
          }
        }
      });
  }
  UpdateArticleComment(comment: appArticleComments) {
    this.ArticleCommentsService.UpdateArticleComments(this.SetUpdatedComment(comment))
      .subscribe((result: any) => {
        comment = result;
        this.Toster.success("Updated Successfuly");
      }),
      () => {
        this.Toster.error("Update failed");
      };
  }
  DeleteComment(comment: appArticleComments) {
    console.log("comment Id>> " + comment.id);
    this.ArticleCommentsService.DeleteArticleComments(comment)
      .subscribe(() => {
        this.getArticleComments();
        this.Toster.success("Deleted Successfuly");
      }),
      () => {
        this.Toster.error("Delete failed");
      };
  }
  CheckArticleCommentLike(comment: appArticleComments, rowIndex: number) {
    let _comment = this.SetCommentLikeDisLikeObject(comment, rowIndex);
    this.articleCommentsSubscription =
      this.ArticleCommentsService.CheckArticleCommentLike(_comment)
        .subscribe((result: any) => {
          if (result) {
            this.commentLikeDisLike = result[0];
            if (this.commentLikeDisLike) {
              console.log("commentLikeDisLike>> if exsists " + this.commentLikeDisLike);
              if (this.commentLikeDisLike.likec === 1) {
                console.log('this.commentLikeDisLike.likec if true>> ' + this.commentLikeDisLike.likec);
                this.isCommentLiked[rowIndex] = true;
                console.log(' this.isCommentLiked if true>> ' + this.isCommentLiked);
              }
              else {
                this.isCommentLiked[rowIndex] = false;
                console.log(' this.isCommentLiked if false>> ' + this.isCommentLiked);
              }
            }
            else {
              this.isCommentLiked[rowIndex] = false;
              console.log("commentLikeDisLike>> if not exsists then liked is false " + this.isCommentLiked[rowIndex]);
            }
          }
        });
  }
  ArticleCommentLikeDisLike(comment: appArticleComments, rowIndex: number) {
    this.LimitsCheckSubscription = this.articleDescription.GetArticleLikeCommentsCredit(this.articleLikeFavCommentObject)
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            this.articleCommentsSubscription =
              this.ArticleCommentsService.ArticleCommentLikeDisLike(this.SetCommentLikeDisLikeObject(comment, rowIndex, true))
                .subscribe(() => {
                  console.log("Success");
                  this.CheckArticleCommentLike(comment, rowIndex);
                  this.getArticleComments();
                });
          }
          else {
            this.Toster.error("Limits Alert: You usesd all your credits.");
            return false;
          }
        }
      });
  }
  ModifyComment(rowIndex: number) {
    this.editComment[rowIndex] = true;
  }
  SetUpdatedComment(comment: appArticleComments) {
    this.updatedComment.id = comment.id;
    this.updatedComment.comments = comment.comments;
    this.ReplcaseMultipleSpacesLinesBreak('updateArticleComment');
    return this.updatedComment;
  }
  SetCommentLikeDisLikeObject(comment: appArticleComments, rowIndex: number, setLikeDislike?: boolean) {
    this.commentLikeDisLikeSentObject = {} as appCommentLikeDislike;
    this.commentLikeDisLikeSentObject.cid = comment.id;
    this.commentLikeDisLikeSentObject.uname = this.localStorage.getItem("UserId");
    if (setLikeDislike) {
      console.log("do like or dislike case ");
      this.isCommentLiked[rowIndex] ? this.commentLikeDisLikeSentObject.likec = 0 : this.commentLikeDisLikeSentObject.likec = 1;
    }
    console.log("commentLikeDisLikeSentObject>> " + this.commentLikeDisLikeSentObject);
    return this.commentLikeDisLikeSentObject;
  }
  //#endregion

  //#region Upload Article Poster
  compressImage(image) {
    this.resizedImage = "";
    console.log("FROM COMPRESS FUNCTION");
    console.log("uploaded image >>" + image);
    console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
    this.imageCompress.compressFile(image, this.orientation, 30, 50).then(
      result => {
        this.resizedImage = result;
        console.warn('Size in bytes is now:', this.imageCompress.byteCount(this.resizedImage));
      }
    );
    return this.resizedImage;
  }
  fileChangeEvent(event: any): void {
    //clear the cropped image instance.
    this.croppedImage = "";
    if (event.target.files[0].size > 1310720) {//more than 1 mb.
      this.imageChangedEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images larger than 1MB.";
      return;
    } else {//size is ok.
      this.imageChangedEvent = event;
      var type = event.target.files[0].type;
      this.fileExtension = type.split('/')[1];
      this.isLoadingImageError = false;
      this.loadingimageError = "";
      this.posterPhotoModified = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.width < 1280 && event.height < 600) {
      this.imageChangedEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images less than 1280px width and 600px height.";
      return;
    }
    else {
      console.log("image width>> " + event.width);
      console.log("image height>> " + event.height);
      console.log("image height>> " + event.height);
      console.log("image cropperPosition>> " + event.cropperPosition);
      console.log("image imagePosition>> " + event.imagePosition);
      console.log("image offsetImagePosition>> " + event.offsetImagePosition);
      this.croppedImage = event.base64;
      this.compressImage(this.croppedImage);
      this.isLoadingImageError = false;
      this.loadingimageError = "";
    }
  }
  imageLoaded(event) {
    /* show cropper */
    console.log("croper loaded >> " + event.cropper);
  }
  cropperReady() {
    /* cropper ready */
    console.log("croper ready");
  }
  loadImageFailed() {
    /* show message */
  }
  SavePostingPoster(action: string, showToaster?: boolean) {
    switch (action) {
      case 'save':
        this.isPosterImageSaveClicked = true;
        this.updatedPosterImages.id = this.article.id;
        this.article.postingLargeImageUrl.length > 1
          ? this.updatedPosterImages.PostingLargeImageUrl = this.article.postingLargeImageUrl.replace("~", "")
          : this.updatedPosterImages.PostingLargeImageUrl = this.article.postingLargeImageUrl;
        this.updatedPosterImages.imageExtention = "." + this.fileExtension;
        this.updatedPosterImages.imageBase64 = this.resizedImage.replace("data:image/png;base64,", "");
        this.ArticleSubscription = this.articleDescription.UpdateArticlePosterImage(this.updatedPosterImages)
          .subscribe((result: any) => {
            if (result) {
              if (this.imageChangedEvent) {
                this.imageChangedEvent = null;
                this.isPosterImageEdit = false;
                this.posterPhotoModified = false;
              }
              this.getArticle(true);
              this.isPosterImageSaveClicked = false;
              if (showToaster) {
                this.Toster.success("Poster photo saved successfuly");
              }
            }
          });
        break;
      case 'remove':
        this.isPosterImageRemoveClicked = true;
        this.updatedPosterImages.id = + this.article.id;
        this.updatedPosterImages.imageBase64 = "";
        this.article.postingLargeImageUrl.length > 1
          ? this.updatedPosterImages.PostingLargeImageUrl = this.article.postingLargeImageUrl.replace("~", "")
          : this.updatedPosterImages.PostingLargeImageUrl = this.article.postingLargeImageUrl;
        this.ArticleSubscription = this.articleDescription.UpdateArticlePosterImage(this.updatedPosterImages)
          .subscribe((result: any) => {
            if (result) {
              this.isPosterImageRemoveClicked = false;
              this.isPosterImageEdit = false;
              this.getArticle(true);
              this.Toster.success("Poster photo removed successfuly");
            }
          });
        break;
      case 'cancel':
        this.imageChangedEvent = null;
        this.croppedImage = "";
        this.isPosterImageEdit = false;
        break;
    }
  }
  EditPostingPoster() {
    this.isPosterImageEdit = true;
    this.croppedImage = "";
  }
  //#endregion
  //#endregion
}
