import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appArticleDescription } from '../../models/ArticleDescription';
import { appPostingCategories } from '../../models/posting-categories';
import { PostingServiceService } from '../../Services/posting-service.service';
import { ArticleDescriptionService } from '../../Services/article-description.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'Shared/Services/error-handler.service';
import { appLimits, appActiveUpgrade } from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { MetaDefinition } from '@angular/platform-browser';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit, OnDestroy {
  constructor(
    private postingServices: PostingServiceService
    , private ArticleDescriptionService: ArticleDescriptionService
    , private router: Router
    , private errorHandler: ErrorHandlerService
    , private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private meta: MetaTagslService
    , private imageCompress: NgxImageCompressService) { }
  newArticleTitleRemainingChars: number = 0;
  newArticleTagsRemainingChars: number = 0;
  newArticleBodyRemainingChars: number = 0;
  postingCategoriesList: appPostingCategories[] = [];
  article: appArticleDescription = {} as appArticleDescription;
  articleSubScription: Subscription;
  errorMessage: string = "";
  LimitsSubscription: Subscription;
  UpgradeSubscription: Subscription;
  CheckCreditsSubscription: Subscription;
  PosterSubscription: Subscription;
  limits: appLimits = {} as appLimits;
  upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  metaTags: MetaDefinition[] = [];
  MonthlyLimits: number = 0;
  isUsedFullArticleLimits = false;
  isLoadingImageError = false;
  isUploadingPosterImage = false;
  orientation: DOC_ORIENTATION;
  croppedImage = "";
  resizedImage = "";
  imageChangedEvent = "";
  loadingimageError = "";
  fileExtension = "";
  ngOnInit(): void {
    this.fillPostingCategories();
    this.GetAdminSettingsAndUpgrade();
    this.CheckArticleLimits();
    this.SetMetaTags();
  }
  ngOnDestroy(): void {
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
  }
  SetMetaTags() {
    this.metaTags =
      [
        { name: 'title', content: "New Posting | ispace1" },
        { name: "description", content: "New Posting at ispace1" }
      ];
    this.meta.SetPageTitle("New Posting | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  savePostings(form: NgForm) {
    this.article.header = form.value["postingTitle"];
    this.article.header = this.article.header.replace(/ {2,}/g, ' ').trim();
    this.article.description = form.value["postingBody"];
    this.article.description = this.article.description.replace(/ {2,}/g, ' ').trim().replace(/[\r\n]{2,}/g, "\n");
    this.article.status = "Active";
    this.article.commentStatus = form.value["rbAllowComments"];
    this.article.tag = form.value["postingTags"];
    this.article.tag = this.article.tag.replace(/ {2,}/g, ' ').trim();
    this.article.isFromArticlePackCredits = form.value["cbArticlePack"] ? 1 : 0;
    this.article.catId = this.GetSelectedPostCategoryId(form.value["postCategory"]);
    this.article.author = this.ArticleDescriptionService.getUname();;
    this.article.articleUserId = this.ArticleDescriptionService.getProfileId();
    this.article.userId = +this.ArticleDescriptionService.getProfileId();
    this.article.imageDescription = "";
    this.article.video = "";
    this.article.file = "";
    this.article.onllinStatus = "Pending";
    this.article.timeCreated = new Date();
    this.article.viewno = 0;
    this.article.postingLargeImageUrl = "";
    this.article.postingSmallImageUrl = "";
    console.log(this.article);
    this.articleSubScription = this.ArticleDescriptionService.AddArticle(this.article)
      .subscribe((result) => {
        if (result) {
          console.log("Success");
          this.SavePoster(result[0].id);
          this.router.navigate(['/MyPostings'], { queryParams: { status: 's' } });
        }
      }, (error) => {
        throw error;
      });
  }
  fillPostingCategories() {
    this.postingCategoriesList = this.postingServices.fillPostingCategories();
  }
  GetSelectedPostCategoryId(categoryName: string): number {
    let categoryId;
    for (var i = 1; i < this.postingCategoriesList.length; i++) {
      if (this.postingCategoriesList[i].categoryName === categoryName) {
        categoryId = this.postingCategoriesList[i].categoryId;
      }
    }
    return categoryId;
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
  CheckArticleLimits() {
    this.CheckCreditsSubscription = this.ArticleDescriptionService.GetArticlesCredit(this.ArticleDescriptionService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.MonthlyLimits = this.ArticleDescriptionService.GetLimits("monthly", this.limits, this.upgrade);
          console.log("monthly>> " + this.MonthlyLimits);
          if (result.length >= this.MonthlyLimits) {
            this.isUsedFullArticleLimits = true;
            return false;
          }
        }
      });
  }
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
    this.isUploadingPosterImage = true;
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
      console.log("image value>> " + this.resizedImage);
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
  SavePoster(id) {
    const PosterImage = { id: 0, PostingLargeImageUrl: '', imageExtention: '', imageBase64: '' };
    PosterImage.id = id;
    PosterImage.PostingLargeImageUrl = "";
    PosterImage.imageExtention = "." + this.fileExtension;
    PosterImage.imageBase64 = this.resizedImage.replace("data:image/png;base64,", "");
    this.PosterSubscription = this.ArticleDescriptionService.UpdateArticlePosterImage(PosterImage)
      .subscribe((result: any) => {
        if (result) {
          if (this.imageChangedEvent) {
            this.imageChangedEvent = null;
          }
        }
      });
  }
  CancelPosterUpload() {
    this.isUploadingPosterImage = false;
    this.imageChangedEvent = null;
    this.croppedImage = "";
    return false;
  }
  //#endregion
  //#endregion
}
