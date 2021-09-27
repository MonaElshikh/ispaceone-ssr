import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appCountry } from 'Shared/models/Country';
import {
  ActivityLevelList,
  ChildrenList,
  DietList,
  DisabilitylList,
  DrinkList,
  EthnicityList,
  ExerciseList,
  EyeList,
  GenderList,
  HairList,
  HeightList,
  HighesteduList,
  IncomeList,
  IndustryList,
  languageList,
  MaritalStatusList,
  PhysiqueList,
  PoliticalList,
  ProfessionList,
  ProfileTypeList,
  ProfStatusList,
  ReligionList,
  SectorList,
  SexualityList,
  SmokeList,
} from 'Shared/models/general-lists';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { AuthService } from 'Shared/Services/auth.service';
import { ConfirmDialogService } from 'Shared/Services/confirm-dialog.service';
import { CountryService } from 'Shared/Services/country.service';
import { ErrorHandlerService } from 'Shared/Services/error-handler.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { environment } from '../../../../environments/environment';
import { appArticleList } from '../../models/ArticleDescription';
import { appMessages, appMessageThreads } from '../../models/messages';
import {
  appProfile,
  appProfileCustomFields,
  appProfileFavLike,
  appProfilePhoto,
  appProfileSeeking,
  appRelatedProfiles,
} from '../../models/profile';
import { IsFavedService } from '../../Services/is-faved.service';
import { IsLikedService } from '../../Services/is-liked.service';
import { MessagesService } from '../../Services/messages.service';
import { MyArticlesListService } from '../../Services/my-articles-list.service';
import { ProfileCustomFieldsService } from '../../Services/profile-custom-fields.service';
import { ProfileService } from '../../Services/profile-service.service';
import { ProfileViewsService } from '../../Services/profile-views.service';
import { ProfilesFavMeService } from '../../Services/profiles-fav-me.service';
import { ProfilesLikedMeService } from '../../Services/profiles-liked-me.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  //#region Declarations
  ProfileForm: NgForm;
  url = "/Posting/";
  aType = "";
  finalValue = "";
  ThreadId = 0;
  fullRelatedProfilesList: appRelatedProfiles[] = [];
  topRelatedprofilesList: appRelatedProfiles[] = [];
  bottomRelatedprofilesList: appRelatedProfiles[] = [];
  genderList: string[] = GenderList;
  maritalStatusList: string[] = MaritalStatusList;
  childrenList: string[] = ChildrenList;
  SexualityList: string[] = SexualityList;
  ReligionList: string[] = ReligionList;
  EthnicityList: string[] = EthnicityList;
  PoliticalList: string[] = PoliticalList;
  DisabilitylList: string[] = DisabilitylList;
  HeightList: string[] = HeightList;
  PhysiqueList: string[] = PhysiqueList;
  EyeList: string[] = EyeList;
  HairList: string[] = HairList;
  DietList: string[] = DietList;
  DrinkList: string[] = DrinkList;
  SmokeList: string[] = SmokeList;
  languageList: string[] = languageList;
  ExerciseList: string[] = ExerciseList;
  HighesteduList: string[] = HighesteduList;
  SectorList: string[] = SectorList;
  ProfStatusList: string[] = ProfStatusList;
  ProfessionList: string[] = ProfessionList;
  IndustryList: string[] = IndustryList;
  IncomeList: string[] = IncomeList;
  ActivityLevelList: string[] = ActivityLevelList;
  ProfileTypeList: string[] = ProfileTypeList;
  metaTags: MetaDefinition[] = [];
  CountriesList: appCountry[] = [];
  resizedPosterImage = "";
  resizedProfileImage = "";
  resizedPhotoImage = "";
  resizedImage: string;
  imageName = "";
  imageDescription = "";
  FromAge = "";
  ToAge = "";
  userLocation = "";
  similarProfilesLocation = [];
  uploadingProfilePhoto = false;
  uploadingPosterPhoto = false;
  uploadingAlbumPhotos = false;
  profileTypeModified = false;
  spokenLangModified = false;
  seekingModified = false;
  isSaved = false;
  EditMode = false;
  photosEditMode = false;
  newPosterImageLoaded = false;
  newProfileImageLoaded = false;
  hasPosterImage: boolean;
  hasProfileImage: boolean;
  isPosterImageSaveClicked = false;
  isProfileImageSaveClicked = false;
  isProfilePhotoSaveClicked = false;
  isProfilePhotoEdit = false;
  isAddingPhotos = false;
  isSelected = false;
  loadingimageError = "";
  fileExtension = "";
  profileImageFileExtension = "";
  updatedProfileImages = { imageBase64: '', imageExtention: '', CanvasImageUrl: '', PassportImageUrl: '', User_Id: 0 };
  blockedProfileObject = { UserId: "", AbuseProfileId: "" };
  reportedProfileObject = { UserId: "", AbuseProfileId: "", ReportCause: "", ReportDetails: "" };
  imageChangedEvent: any = "";
  croppedImage: any = "";
  profileImageChangeEvent: any = "";
  profileCroppedImage: any = "";
  ProfilePhotoChangedEvent: any = "";
  ProfilePhotoCroppedImage = "";
  profilePhotoFileExtension = "";
  messageBody = "";
  tags: string[] = [];
  limits: appLimits = {} as appLimits;
  upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  ProfileId = 0;
  DailyLimit = 0;
  LifeTimeLimit = 0;
  MesgCredit = 0;
  spamMessage: appMessageThreads[] = [];
  RepliedMessage: appMessageThreads = {} as appMessageThreads;
  NewMessageThread: appMessageThreads = {} as appMessageThreads;
  MessageThread: appMessages[] = [];
  NewMessage: appMessages = {} as appMessages;
  InsertedMessage: appMessages = {} as appMessages;
  CreditMesg: appMessages[] = [];
  profilePhotosList: appProfilePhoto[] = [];
  profilePhotoObject: appProfilePhoto = {} as appProfilePhoto;
  profileSeeking: appProfileSeeking = {} as appProfileSeeking;
  ProfileSeekingObject: appProfileSeeking = {} as appProfileSeeking;
  PhotosList = [{ image: "", thumbImage: "", alt: "", title: "" }];
  resource = { SenderId: 0, ReceiverId: 0 };
  profileViewObject = { UserId: 0, ShowenProfileUserId: 0 };
  isSpamMessage: boolean;
  isUsedFullMesgCredit: boolean;
  isUsedFullPhotoCredit: boolean;
  isUsedFullBlockCredit: boolean;
  isUsedFullReportCredit: boolean;
  InsertedMessageId;
  Appearance = "";
  SeekingAppearance = "";
  SeekingLifeStyle = "";
  Lifestyle = "";
  Location = "";
  spokenLang = "";
  seekingGender = "";
  seekingMartialStatus = "";
  seekingChildren = "";
  seekingSexuality = "";
  seekingReligion = "";
  seekingEthnicity = "";
  seekingPolitical = "";
  seekingDisplay = "";
  seekingHeight = "";
  seekingPhysique = "";
  seekingEyes = "";
  seekingHair = "";
  seekingDiet = "";
  seekingDrink = "";
  seekingSmoke = "";
  seekingExercise = "";
  seekingLanguages = "";
  spokenLanguages = "";
  profileType = "";
  seekingCountry = "";
  seekingHeightstEdu = "";
  seekingProfession = "";
  seekingSector = "";
  seekingIndustry = "";
  seekingprofStatus = "";
  seekingIncome = "";
  seekingActivityLevel = "";
  LikesFavsList: any[] = [];
  LikesCount = 0;
  FavsCount = 0;
  Age: any = 0;
  loggedInUserId = 0;
  testMode = false;
  profileImageUrl = "";
  errorMessage = "";
  userProfile: appProfile = {} as appProfile;
  checkUserProfile: appProfile = {} as appProfile;
  ProfileLikedFavedReturnedObject: appProfileFavLike = {} as appProfileFavLike;
  ProfileLikedFavedSentObject = { userId: 0, profileUserId: 0, isLiked: 0 };
  CheckBlockedProfileObject = { UserId: "", AbuseProfileId: "" };
  highLightsList = [];
  tagsList = [];
  ProfileCf: appProfileCustomFields = {} as appProfileCustomFields;
  PersonalCF: appProfileCustomFields = {} as appProfileCustomFields;
  EducationCF: appProfileCustomFields = {} as appProfileCustomFields;
  ProfessionalCF: appProfileCustomFields = {} as appProfileCustomFields;
  InterestsCF: appProfileCustomFields = {} as appProfileCustomFields;
  MoreCf: appProfileCustomFields = {} as appProfileCustomFields;
  profileId; profileOwner = false;
  currentUser = { uName: "", id: 0 };
  subscribtion: Subscription;
  parameterSubscription: Subscription;
  LikesSubscription: Subscription;
  IsLikesSubscription: Subscription;
  IsFavsSubscription: Subscription;
  FavsSubscription: Subscription;
  LikeUnLikeFavUnFav: Subscription;
  UpdateProfileSubscription: Subscription;
  CustomFieldsSubscription: Subscription;
  UpdateCustomFieldsSubscription: Subscription;
  MessageSubscription: Subscription;
  NewMessageSubscription: Subscription;
  MessageThreadSubscription: Subscription;
  postingSubscription: Subscription;
  LimitsSubscription: Subscription;
  UpgradeSubscription: Subscription;
  CheckCreditsSubscription: Subscription;
  ProfileViewSubscription: Subscription;
  completionCompletePercent = 0;
  completionNeededPercent = 0;
  activityCompletePercent = 20;
  activityNeededPercent = 80;
  liked = false;
  faved = false;
  //more fields
  summaryRemainingChars = 0;
  photoTagLineRemainingChars = 0;
  morePersonalRemainingChars = 0;
  moreEducationRemainingChars = 0;
  moreProfessionRemainingChars = 0;
  moreInterestsRemainingChars = 0;
  messageRemainingChars = 0;
  // Personal fields
  cityRemainingChars = 0;
  //profession fields
  specializationRemainingChars = 0;
  highSchoolRemainingChars = 0;
  undergradCollegeRemainingChars = 0;
  gradSchoolRemainingChars = 0;
  postGradRemainingChars = 0;
  //Profession fields
  memberOfRemainingChars = 0;
  keySkillsRemainingChars = 0;
  mainAcheavmentRemainingChars = 0;
  coreCertificationRemainingChars = 0;
  currentEmployerRemainingChars = 0;
  pastEmployerRemainingChars = 0;
  //Intersts fields
  interestsRemainingChars = 0;
  hobbiesRemainingChars = 0;
  favMusicRemainingChars = 0;
  favMoviesRemainingChars = 0;
  favrReadsRemainingChars = 0;
  favSportsRemainingChars = 0;
  favCuisinesRemainingChars = 0;
  favDressRemainingChars = 0;
  favOutingsRemainingChars = 0;
  //Conatct info
  phoneRemainingChars = 0;
  contactMailRemainingChars = 0;
  websiteRemainingChars = 0;
  messangerRemainingChars = 0;
  otherRemainingChars = 0;
  //More Fileds
  morelbl1RemainingChars = 0;
  moreVlaue1RemainingChars = 0;
  morelbl2RemainingChars = 0;
  moreVlaue2RemainingChars = 0;
  morelbl3RemainingChars = 0;
  moreVlaue3RemainingChars = 0;
  morelbl4RemainingChars = 0;
  moreVlaue4RemainingChars = 0;
  morelbl5RemainingChars = 0;
  moreVlaue5RemainingChars = 0;
  morelbl6RemainingChars = 0;
  moreVlaue6RemainingChars = 0;
  morelbl7RemainingChars = 0;
  moreVlaue7RemainingChars = 0;
  morelbl8RemainingChars = 0;
  moreVlaue8RemainingChars = 0;
  //Tags Field
  tagRemainingChars = 0;
  IsProfileForbidden = false;
  viewMoreLessSummary = false;
  viewMoreLessPersonal = false;
  viewMoreLessEducation = false;
  viewMoreLessProfession = false;
  viewMoreLessInterests = false;

  viewMoreval1 = false;
  viewMoreval2 = false;
  viewMoreval3 = false;
  viewMoreval4 = false;
  viewMoreval5 = false;
  viewMoreval6 = false;
  viewMoreval7 = false;
  viewMoreval8 = false;
  counter = 0;
  showbtnEditProfileImg = false;
  showbtnEditPosterImg = false;
  showbtnEditHeadline = false;
  hasMessageHistory = false;
  isSummaryEditMode = false;
  isHighlightsEditMode = false;
  isPhotosEditMode = false;
  isPersonalEditMode = false;
  isEducationEditMode = false;
  isProfessionEditMode = false;
  isInterstsEditMode = false;
  isMoreEditMode = false;
  isContactInfoEditMode = false;
  isTagsEditMode = false;
  isHeadlineEditMode = false;
  isSeekingEditMode = false;
  isPosterImageEdit = false;
  isProfileImageEdit = false;
  isPosterImageRemoveClicked = false;
  isProfileImageRemoveClicked = false;
  toggleShowProfileBtn = true;
  isHighlightsCollapse = false;
  isPhotosCollapse = false;
  isSummaryCollapse = true;
  isPersonalCollapse = true;
  isEducationCollapse = true;
  isProfessionCollapse = true;
  isInterstsCollapse = true;
  isContactInfoCollapse = true;
  isMoreCollapse = true;
  isPostingCollapse = true;
  isSeekingCollapse = true;
  isLoadingImageError = false;
  IsRejectedProfile = false;
  DataLoading = true;
  showExtraProfiles = false;
  currentRoute = "";
  hosturl = "";
  CurrentStatus = "";
  ShownSummary = "";
  ShownPersonalInfo = "";
  ShownEduInfo = "";
  ShownProfInfo = "";
  ShownIntInfo = "";
  ShownMore1 = "";
  ShownMore2 = "";
  ShownMore3 = "";
  ShownMore4 = "";
  ShownMore5 = "";
  ShownMore6 = "";
  ShownMore7 = "";
  ShownMore8 = "";
  baseUrl: string;
  passportImageUrl = "";
  canvasImageUrl = "";
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  orientation: DOC_ORIENTATION;
  postingList: appArticleList[] = [];
  placholderList = [1, 2, 3, 4];
  ageList = ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
    , '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55',
    '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '78', '79',
    '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];

  //#endregion
  // canDeactivate(): Observable<boolean> | boolean {

  // }
  //#region Events
  constructor(
    public profileService: ProfileService,
    private GetProfileByuName: ProfileService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    public authService: AuthService,
    private ProfilesLikedMeService: ProfilesLikedMeService,
    private ProfilesFavMeService: ProfilesFavMeService,
    private IsLikedService: IsLikedService,
    private IsFavedService: IsFavedService,
    private ProfileCustomFieldsService: ProfileCustomFieldsService,
    private messagesService: MessagesService,
    private ConfirmDialogService: ConfirmDialogService,
    private imageCompress: NgxImageCompressService,
    private MyArticlesListService: MyArticlesListService,
    private LimitsAndUpgradeService: LimitsAndUpgradeService,
    private spinner: NgxSpinnerService,
    private ProfileViewsService: ProfileViewsService,
    private Toster: ToastrService,
    private CountryService: CountryService,
    private localStorage: LocalstorageService,
    private meta: MetaTagslService) {
    this.currentRoute = this.router.url;
    this.hosturl = environment.HostUrl;
    this.baseUrl = environment.BASE_URL + '/';
  }
  ngOnInit(): void {
    this.getUserProfile(false);
    this.localStorage.getItem("AccountType") ? this.aType = this.localStorage.getItem("AccountType") : this.aType = "";
    this.BindCountries();
    //check if suspended or deleted profile
    let suspend = this.activeRoute.snapshot.queryParams["suspend"];
    if (suspend) {
      this.IsRejectedProfile = true;
      this.CurrentStatus = "Your profile has been screened and rejected due to violation of our general terms and conditions. Your profile won’t be visible anywhere and you will not be able to do any actions except update your profile and photos until you fix any possible problems and issues.";
    }
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
    if (this.LikesSubscription) this.LikesSubscription.unsubscribe();
    if (this.IsLikesSubscription) this.IsLikesSubscription.unsubscribe();
    if (this.FavsSubscription) this.FavsSubscription.unsubscribe();
    if (this.IsFavsSubscription) this.IsFavsSubscription.unsubscribe();
    if (this.LikeUnLikeFavUnFav) this.LikeUnLikeFavUnFav.unsubscribe();
    if (this.UpdateProfileSubscription) this.UpdateProfileSubscription.unsubscribe();
    if (this.CustomFieldsSubscription) this.CustomFieldsSubscription.unsubscribe();
    if (this.UpdateCustomFieldsSubscription) this.UpdateCustomFieldsSubscription.unsubscribe();
    if (this.MessageSubscription) this.MessageSubscription.unsubscribe();
    if (this.NewMessageSubscription) this.NewMessageSubscription.unsubscribe();
    if (this.MessageThreadSubscription) this.MessageThreadSubscription.unsubscribe();
    if (this.postingSubscription) this.postingSubscription.unsubscribe();
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
    if (this.CheckCreditsSubscription) this.CheckCreditsSubscription.unsubscribe();
    if (this.ProfileViewSubscription) this.ProfileViewSubscription.unsubscribe();
    this.CheckFormDirty();
  }
  //#endregion
  //#region General functions
  //fun to check long text length and show part of it by defult.
  SetShownText() {
    if (this.userProfile.summary !== null) {
      if (this.userProfile.summary.length <= 500) {
        this.ShownSummary = this.userProfile.summary;
        this.viewMoreLessSummary = false;
      } else {
        this.ShownSummary = this.userProfile.summary.substring(0, 500) + " ...";
        this.viewMoreLessSummary = true;
      }
    }
    if (this.userProfile.per_Info !== null) {
      if (this.userProfile.per_Info.length <= 500) {
        this.ShownPersonalInfo = this.userProfile.per_Info;
        this.viewMoreLessPersonal = false;
      } else {
        this.ShownPersonalInfo = this.userProfile.per_Info.substring(0, 500) + " ...";
        this.viewMoreLessPersonal = true;
      }
    }
    if (this.userProfile.edu_info !== null) {
      if (this.userProfile.edu_info.length <= 500) {
        this.ShownEduInfo = this.userProfile.edu_info;
        this.viewMoreLessEducation = false;
      } else {
        this.ShownEduInfo = this.userProfile.edu_info.substring(0, 500) + " ...";
        this.viewMoreLessEducation = true;
      }
    }
    if (this.userProfile.profinfo !== null) {
      if (this.userProfile.profinfo.length <= 500) {
        this.ShownProfInfo = this.userProfile.profinfo;
        this.viewMoreLessProfession = false;
      } else {
        this.ShownProfInfo = this.userProfile.profinfo.substring(0, 500) + " ...";
        this.viewMoreLessProfession = true;
      }
    }
    if (this.userProfile.interstinfo !== null) {
      if (this.userProfile.interstinfo.length <= 500) {
        this.ShownIntInfo = this.userProfile.interstinfo;
        this.viewMoreLessInterests = false;
      } else {
        this.ShownIntInfo = this.userProfile.interstinfo.substring(0, 500) + " ...";
        this.viewMoreLessInterests = true;
      }
    }
  }
  ShowMoreLess(boxName: string) {
    switch (boxName) {
      case "summary":
        if (this.viewMoreLessSummary) {
          this.ShownSummary = this.userProfile.summary;
          this.viewMoreLessSummary = false;
        }
        else {
          this.ShownSummary = this.userProfile.summary.substring(0, 500) + " ...";
          this.viewMoreLessSummary = true;
        }
        break;
      case "personal":
        if (this.viewMoreLessPersonal) {
          this.ShownPersonalInfo = this.userProfile.per_Info;
          this.viewMoreLessPersonal = false;
        }
        else {
          this.ShownPersonalInfo = this.userProfile.per_Info.substring(0, 500) + " ...";
          this.viewMoreLessPersonal = true;
        }
        break;
      case "education":
        if (this.viewMoreLessEducation) {
          this.ShownEduInfo = this.userProfile.edu_info;
          this.viewMoreLessEducation = false;
        }
        else {
          this.ShownEduInfo = this.userProfile.edu_info.substring(0, 500) + " ...";
          this.viewMoreLessEducation = true;
        }
        break;
      case "profession":
        if (this.viewMoreLessProfession) {
          this.ShownProfInfo = this.userProfile.profinfo;
          this.viewMoreLessProfession = false;
        }
        else {
          this.ShownProfInfo = this.userProfile.profinfo.substring(0, 500) + " ...";
          this.viewMoreLessProfession = true;
        }
        break;
      case "interests":
        if (this.viewMoreLessInterests) {
          this.ShownIntInfo = this.userProfile.interstinfo;
          this.viewMoreLessInterests = false;
        }
        else {
          this.ShownIntInfo = this.userProfile.interstinfo.substring(0, 500) + " ...";
          this.viewMoreLessInterests = true;
        }
        break;
      case "more1":
        if (this.viewMoreval1) {
          this.ShownMore1 = this.MoreCf.aCustomText1;
          this.viewMoreval1 = false;
        }
        else {
          this.ShownMore1 = this.MoreCf.aCustomText1.substring(0, 500) + " ...";
          this.viewMoreval1 = true;
        }
        break;
      case "more2":
        if (this.viewMoreval2) {
          this.ShownMore2 = this.MoreCf.aCustomText2;
          this.viewMoreval2 = false;
        }
        else {
          this.ShownMore2 = this.MoreCf.aCustomText2.substring(0, 500) + " ...";
          this.viewMoreval2 = true;
        }
        break;
      case "more3":
        if (this.viewMoreval3) {
          this.ShownMore3 = this.MoreCf.aCustomText3;
          this.viewMoreval3 = false;
        }
        else {
          this.ShownMore3 = this.MoreCf.aCustomText3.substring(0, 500) + " ...";
          this.viewMoreval3 = true;
        }
        break;
      case "more4":
        if (this.viewMoreval4) {
          this.ShownMore4 = this.MoreCf.aCustomText4;
          this.viewMoreval4 = false;
        }
        else {
          this.ShownMore4 = this.MoreCf.aCustomText4.substring(0, 500) + " ...";
          this.viewMoreval4 = true;
        }
        break;
      case "more5":
        if (this.viewMoreval5) {
          this.ShownMore5 = this.MoreCf.aCustomText5;
          this.viewMoreval5 = false;
        }
        else {
          this.ShownMore5 = this.MoreCf.aCustomText5.substring(0, 500) + " ...";
          this.viewMoreval5 = true;
        }
        break;
      case "more6":
        if (this.viewMoreval6) {
          this.ShownMore6 = this.MoreCf.aCustomText6;
          this.viewMoreval6 = false;
        }
        else {
          this.ShownMore6 = this.MoreCf.aCustomText6.substring(0, 500) + " ...";
          this.viewMoreval6 = true;
        }
        break;
      case "more7":
        if (this.viewMoreval7) {
          this.ShownMore7 = this.MoreCf.aCustomText7;
          this.viewMoreval7 = false;
        }
        else {
          this.ShownMore7 = this.MoreCf.aCustomText7.substring(0, 500) + " ...";
          this.viewMoreval7 = true;
        }
        break;
      case "more8":
        if (this.viewMoreval8) {
          this.ShownMore8 = this.MoreCf.aCustomText8;
          this.viewMoreval8 = false;
        }
        else {
          this.ShownMore8 = this.MoreCf.aCustomText8.substring(0, 500) + " ...";
          this.viewMoreval8 = true;
        }
        break;
    }
  }
  //fun to check if the for has un saved changes and alert the user.
  CheckFormDirty() {
    if (this.ProfileForm !== null && this.ProfileForm !== undefined) {
      let dirty = false;
      if ((this.ProfileForm.dirty && !this.isSaved)
        || this.uploadingAlbumPhotos
        || this.spokenLangModified
        || this.profileTypeModified
        || this.seekingModified
        || this.uploadingPosterPhoto
        || this.uploadingProfilePhoto) {
        dirty = true;
      }
      if (dirty) {
        this.ConfirmDialogService.confirm("Leave Page?", "You have made changes without saving them.", "Save", "Discard", "sm")
          .then((confirmed) => {
            console.log("confirmed> " + confirmed);
            if (confirmed) {
              console.log(this.ProfileForm.value);
              this.saveProfile(false);
              if (this.uploadingPosterPhoto) {
                this.SaveProfileImages("poster", "save", false);
              }
              if (this.uploadingProfilePhoto) {
                this.SaveProfileImages("profile", "save", false);
              }
              if (this.uploadingAlbumPhotos) {
                this.SaveProfilePhotos('save');
              }
              dirty = false;
              this.Toster.success("Saved Successfuly");
            }
          });
      }
    }
  }
  toggle(boxName: string) {
    if (this.authService.isLoggedIn()) {
      switch (boxName) {
        case "Highlights":
          this.isHighlightsCollapse = !this.isHighlightsCollapse
          break;
        case 'Photos':
          this.isPhotosCollapse = !this.isPhotosCollapse
          break;
        case 'Summary':
          this.isSummaryCollapse = !this.isSummaryCollapse
          break;
        case 'Personal':
          this.isPersonalCollapse = !this.isPersonalCollapse
          break;
        case 'Education':
          this.isEducationCollapse = !this.isEducationCollapse
          break;
        case 'Profession':
          this.isProfessionCollapse = !this.isProfessionCollapse
          break;
        case 'Interests':
          this.isInterstsCollapse = !this.isInterstsCollapse
          break;
        case 'ContactInfo':
          this.isContactInfoCollapse = !this.isContactInfoCollapse;
          break;
        case 'More':
          this.isMoreCollapse = !this.isMoreCollapse
          break;
        case 'Postings':
          this.isPostingCollapse = !this.isPostingCollapse
          break;
        case 'Seeking':
          this.isSeekingCollapse = !this.isSeekingCollapse;
          break;
        case 'ShowAll':
          this.isSummaryCollapse = false;
          this.isPersonalCollapse = false;
          this.isEducationCollapse = false;
          this.isProfessionCollapse = false;
          this.isInterstsCollapse = false;
          this.isMoreCollapse = false;
          this.isPostingCollapse = false;
          this.isSeekingCollapse = false;
          this.isContactInfoCollapse = false;
          break;
        case 'HideAll':
          this.isSummaryCollapse = true;
          this.isPersonalCollapse = true;
          this.isEducationCollapse = true;
          this.isProfessionCollapse = true;
          this.isInterstsCollapse = true;
          this.isMoreCollapse = true;
          this.isPostingCollapse = true;
          this.isSeekingCollapse = true;
          this.isContactInfoCollapse = true;
          break;
      }
    }
  }
  toggleBoxes(event) {
    if (this.authService.isLoggedIn()) {
      this.toggleShowProfileBtn = !this.toggleShowProfileBtn;
      if (event.srcElement.innerHTML === "Show Full Profile ") {
        this.toggle('ShowAll');
      }
      else {
        this.toggle('HideAll');
      }
    }
  }
  toggelEditMode(tabName?: string) {
    switch (tabName) {
      case 'summary':
        this.isSummaryEditMode = !this.isSummaryEditMode;
        this.isSummaryCollapse = true;
        break;
      case "highlights":
        this.isHighlightsEditMode = !this.isHighlightsEditMode;
        this.isHighlightsCollapse = true;
        break;
      case 'photos':
        this.isPhotosEditMode = !this.isPhotosEditMode;
        this.isPhotosCollapse = true;
        break;
      case 'personal':
        this.isPersonalEditMode = !this.isPersonalEditMode;
        this.isPersonalCollapse = true;
        break;
      case 'education':
        this.isEducationEditMode = !this.isEducationEditMode;
        this.isEducationCollapse = true;
        break;
      case 'profession':
        this.isProfessionEditMode = !this.isProfessionEditMode;
        this.isProfessionCollapse = true;
        break;
      case 'interests':
        this.isInterstsEditMode = !this.isInterstsEditMode;
        this.isInterstsCollapse = true;
        break;
      case 'contactinfo':
        this.isContactInfoEditMode = !this.isContactInfoEditMode;
        this.isContactInfoCollapse = true;
        break;
      case 'more':
        this.isMoreEditMode = !this.isMoreEditMode;
        this.isMoreCollapse = true;
        break;
      case 'Seeking':
        this.isSeekingEditMode = !this.isSeekingEditMode;
        this.isSeekingCollapse = true;
        break;
      case 'tags':
        this.isTagsEditMode = !this.isTagsEditMode;
        break;
      case 'headline':
        this.isHeadlineEditMode = !this.isHeadlineEditMode;
        break;
      case 'posterImage':
        this.isPosterImageEdit = true;
        this.croppedImage = "";
        break;
      case 'ProfileImage':
        this.isProfileImageEdit = true;
        this.profileCroppedImage = "";
        break;
    }
  }
  toggleImageEditButtons(img, action) {
    if (action == 'over') {
      switch (img) {
        case 'profile':
          this.showbtnEditProfileImg = true;
          this.showbtnEditPosterImg = false;
          break;
        case 'poster':
          this.showbtnEditPosterImg = true;
          this.showbtnEditProfileImg = false;
          break;
        case 'headline':
          this.showbtnEditHeadline = true;
          this.showbtnEditPosterImg = false;
          this.showbtnEditProfileImg = false;
          break;
        case 'photos':

      }
    }
    else {
      this.showbtnEditProfileImg = false;
      this.showbtnEditPosterImg = false;
      this.showbtnEditHeadline = false;

    }
  }
  EditProfileBoxes() {
    this.EditMode = !this.EditMode;
    this.toggle("ShowAll");
  }
  CancelEditProfile() {
    this.EditMode = !this.EditMode;
    this.toggle('HideAll');
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: this.userProfile.sname + ", " + this.userProfile.city + ", " + this.userProfile.state + ", " + this.userProfile.country + " | ispace1" },
      { name: 'description', content: this.userProfile.photoTagline },
      { name: 'metaImage', content: this.passportImageUrl }
    ];
    this.meta.SetPageTitle(this.userProfile.sname + ", " + this.userLocation + " | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  SetProfileForm(frm: NgForm) {
    if (this.ProfileForm === null || this.ProfileForm === undefined) {
      this.ProfileForm = frm;
    }
  }
  async BindCountries() {
    this.UpgradeSubscription = (await this.CountryService.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.CountriesList = result;
        }
      });
  }
  CountriesChange(event) {
    this.userProfile.country = event.target.value;
  }
  CalculateCompletionValue() {
    console.log("profile on int");
    let textPercentage = 25 / 27;
    let dllPercentage = 25 / 24;
    let DllValues = 0;
    let TxtValues = 0;
    this.completionCompletePercent = 0;
    this.completionNeededPercent = 0;
    this.userProfile.passportImageUrl !== ""
      ? this.completionCompletePercent += 20
      : this.completionCompletePercent = this.completionCompletePercent;
    this.userProfile.canvasImageUrl !== ""
      ? this.completionCompletePercent += 20
      : this.completionCompletePercent = this.completionCompletePercent;
    //check & set  ddls
    this.userProfile.gender !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.mar_status !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.childStatus !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.sexuality !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.religion !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.ethnicity !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.pafflication !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.disability !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.height !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.physique !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.eye !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.hair !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.diet !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.drink !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.smoke !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.exercise !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.slang !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.highestEducation !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.profesional !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.sector !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.industry !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.profStatus !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.income !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    this.userProfile.activitylevel !== ""
      ? DllValues += dllPercentage
      : DllValues = DllValues;
    console.log("Net DllValues: " + DllValues);
    if (DllValues > 25) { DllValues = 25; }
    console.log("Adjusted DllValues: " + DllValues);
    this.completionCompletePercent += DllValues;
    //check & set txts
    this.userProfile.summary !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.city !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.specialization !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.hschool !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.ucollege !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.gradschool !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.postgrade !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.memeberof !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.skill !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.achieve !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.certifications !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.cemp !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.pemp !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.interest !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.hobbies !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteMusic !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteMovies !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteReads !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteSports !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteCuisines !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteDressStyle !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.favoriteOutings !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.phone !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.contactMail !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.website !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    this.userProfile.messenger !== ""
      ? TxtValues += textPercentage
      : TxtValues = TxtValues;
    console.log("Net TxtValues: " + TxtValues);
    if (TxtValues > 25) { TxtValues = 25; }
    console.log("Adjusted  TxtValues: " + TxtValues);
    this.completionCompletePercent += TxtValues;
    //calculate the total percent
    this.completionNeededPercent = 100 - this.completionCompletePercent;
    this.completionCompletePercent = Math.round(this.completionCompletePercent);
    this.completionNeededPercent = Math.round(this.completionNeededPercent);
    console.log("completion percent> " + this.completionCompletePercent);
    console.log("needed percent> " + this.completionNeededPercent);
  }
  //#endregion
  //#region Profile functions
  async getUserProfile(isFromSaveImage?: boolean, isFirstLoad?: boolean) {
    this.spinner.show();
    //get UserName parameter
    this.parameterSubscription = this.activeRoute.params.subscribe(async params => {
      let Uname = params['UserName'];
      this.currentUser.uName = Uname;
      if (this.currentUser.uName) {
        this.subscribtion = (await this.GetProfileByuName.GetProfileByUname(this.currentUser))
          .subscribe((result: any) => {
            if (result) {
              //check if reported profiles
              this.checkUserProfile = result;
              if (
                this.checkUserProfile.reporting.toLowerCase() != "normal"
                && + this.profileService.getProfileId() != this.checkUserProfile.id) {
                this.IsProfileForbidden = true;
                this.router.navigate(['/Profiles'], { queryParams: { forbidden: 'fb' } });
                return;
              }
              //check if blocked profile
              this.CheckBlockedProfileObject.UserId = this.profileService.getProfileId();
              this.CheckBlockedProfileObject.AbuseProfileId = this.checkUserProfile.id.toString();
              this.postingSubscription = this.profileService.CheckBlockedProfile(this.CheckBlockedProfileObject)
                .subscribe((result: any) => {
                  if (result) {
                    if (result.length > 0) {
                      this.IsProfileForbidden = true;
                      this.router.navigate(['/Profiles'], { queryParams: { forbidden: 'fb' } });
                      return;
                    }
                  }
                });
              // setTimeout(() => { }, 10000);s
              this.userProfile = result;
              if (this.userProfile.canvasImageUrl) {
                this.userProfile.canvasImageUrl.indexOf("ispace1-stripe") != -1 ? this.hasPosterImage = false : this.hasPosterImage = true;
              }
              else {
                this.hasPosterImage = false
              }
              if (this.userProfile.passportImageUrl) {
                this.userProfile.passportImageUrl.indexOf("defaultProfileImage") != -1 ? this.hasProfileImage = false : this.hasProfileImage = true;
              }
              else {
                this.hasProfileImage = false
              }
              //Set more/less text boxs length.
              this.SetShownText();
              //Bind Related Profiles
              this.BindRelatedProfiles();
              //Bind poster and passport images
              this.passportImageUrl = this.GetProfileByuName.bindImageUrl('profile', this.userProfile.passportImageUrl);
              this.canvasImageUrl = this.GetProfileByuName.bindImageUrl('posting', this.userProfile.canvasImageUrl);
              //Bind Age
              this.Age = this.GetProfileByuName.CalculateAge(this.userProfile.dob);
              //Bind profile image in top nav bar
              if (isFromSaveImage) {
                this.localStorage.setItem('UserProfileImage', this.userProfile.passportImageUrl);
                this.profileService.setUserProfileImageUrl();
              }

              this.isUsedFullMesgCredit = false;
              this.isUsedFullPhotoCredit = false;
              //Check if profile owner
              this.checkProfileOwner();
              //Load Profile Seeking
              this.LoadProfileSeekings();
              //Set user location
              this.SetUserLocation();
              //Bind Meta tags
              this.SetMetaTags();
              //Check message history
              this.CheckMessageHistoryBetweenUsers();
              //Add profile view 
              this.AddProfileView();
              //Bind posting list 
              this.GetPostingsList();
              //Bind photos list 
              this.GetProfilePhotosList();
              //Bind HighLights
              this.bindHighLightsList();
              //Bind Tags
              this.bindTagsList();
              //Bind ProfileCf
              this.BindProfileCustomFields();
              //Bind Profile Group Values
              this.SetProfileGroupValues();
              //Bind remaining chars
              this.bindUsedChars();
              this.CheckLikesFavs('like');
              this.CheckLikesFavs('fav');
              this.BindLikesFavs('like');
              this.BindLikesFavs('fav');
              //Bind online status
              this.BindOnlineStatus();
              //Bind compeletion
              this.CalculateCompletionValue();

              this.DataLoading = false;
              this.spinner.hide();
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage
          });
      }
    });
  }
  //fun to set user location with format.
  SetUserLocation(profile?: appRelatedProfiles) {
    let location = "";
    let country = ""
    if (profile) {
      country = this.profileService.getCountryAppriviation(profile.country);
      if (profile.city) {
        location = profile.city;
      }
      if (country) {
        location.length > 0 ?
          location += ", " + country :
          location = country;
      }
      return location;
    }
    else {
      country = this.profileService.getCountryAppriviation(this.userProfile.country);
      if (this.userProfile.city) {
        location = this.userProfile.city;
      }
      if (this.userProfile.state) {
        location.length > 0 ?
          location += ", " + this.userProfile.state :
          location = this.userProfile.state;
      }
      if (country) {
        location.length > 0 ?
          location += ", " + country :
          location = country;
      }
      return this.userLocation = location;
    }
  }
  async GetPostingsList() {
    const data = { User_Id: this.userProfile.user_Id, LockUnlock: 1 };
    this.postingSubscription = (await this.MyArticlesListService.create(data))
      .subscribe((result: any) => {
        if (result) {
          this.postingList = result;
        }
      });
  }
  openArticle(article: any) {
    if (article.header) {
      this.router.navigate([this.url, article.header.split(' ').join('-'), article.id]);
    }
  }
  openProfile(uName: string) {
    this.router.navigate(['/Profile/', uName]);
  }
  BindRelatedProfiles() {
    console.log("current profile id> " + this.userProfile.id);
    this.fullRelatedProfilesList.length = 0;
    this.topRelatedprofilesList.length = 0;
    this.bottomRelatedprofilesList.length = 0;
    this.UpdateProfileSubscription = this.profileService.GetRelatedProfiles(this.userProfile.id)
      .subscribe((result: any) => {
        if (result) {
          this.fullRelatedProfilesList = result;
          if (this.fullRelatedProfilesList.length > 0) {
            for (let i = 0; i < 4; i++) {
              this.topRelatedprofilesList.push(this.fullRelatedProfilesList[i]);
            }
            for (let i = 4; i < 8; i++) {
              this.bottomRelatedprofilesList.push(this.fullRelatedProfilesList[i]);
            }
          }
        }
      });
  }
  showMoreProfiles() {
    this.showExtraProfiles = !this.showExtraProfiles;
  }
  BlockProfile() {
    this.isUsedFullReportCredit = false;
    this.CheckCreditsSubscription = this.profileService.GetProfileBlockCredit(this.profileService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          //Check limits
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            this.isUsedFullBlockCredit = false;
            this.isUsedFullReportCredit = false;
            this.ConfirmDialogService.confirm("Confirm Block", "Are you sure you want to block this profile ?", "Yes", "Cancel", "sm")
              .then((confirmed) => {
                if (confirmed) {
                  this.blockedProfileObject.UserId = this.ProfilesFavMeService.getProfileId();
                  this.blockedProfileObject.AbuseProfileId = this.userProfile.id.toString();
                  this.UpdateProfileSubscription = this.profileService.BlockProfile(this.blockedProfileObject)
                    .subscribe((result: any) => {
                      if (result) {
                        this.router.navigate(['/Profiles']);
                      }
                    });
                }
              }).catch(() => {
                console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
              });
          }
          else {
            this.isUsedFullBlockCredit = true;
            return false;
          }
        }
      });
  }
  ReportProfile() {
    this.isUsedFullBlockCredit = false;
    this.CheckCreditsSubscription = this.profileService.GetProfileReportCredit(this.profileService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          if (result.length < this.DailyLimit) {
            this.ConfirmDialogService.confirm("Confirm Report", "Are you sure you want to report this profile ?", "Yes", "Cancel", "sm")
              .then((confirmed) => {
                if (confirmed) {
                  console.log("Report confirmed");
                  this.isUsedFullReportCredit = false;
                  this.reportedProfileObject.UserId = this.ProfilesFavMeService.getProfileId();
                  this.reportedProfileObject.AbuseProfileId = this.userProfile.id.toString();
                  this.reportedProfileObject.ReportCause = "";
                  this.reportedProfileObject.ReportDetails = "";
                  this.UpdateProfileSubscription = this.profileService.ReportProfile(this.reportedProfileObject)
                    .subscribe((result: any) => {
                      if (result) {
                        this.router.navigate(['/Profiles']);
                      }
                    });
                }
              }).catch(() => {
                console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
              });
          }
          else {
            this.isUsedFullReportCredit = true;
            return false;
          }
        }
      });

  }
  checkProfileOwner() {
    if (this.authService.isLoggedIn()) {
      //get the limits/upgrade
      this.GetAdminSettingsAndUpgrade();
      //Check ProfileOwner (view mode)
      if (this.currentUser.uName === this.localStorage.getItem('UserId')) {
        this.profileOwner = true;
      }
    }
  }
  async AddProfileView() {
    if (!this.profileOwner) {
      this.profileService.getProfileId() != "" ? this.profileId = +this.profileService.getProfileId() : this.profileId = 0;
      this.profileViewObject.UserId = this.profileId;
      this.profileViewObject.ShowenProfileUserId = this.userProfile.id;
      console.log("ShownProfile> " + this.profileViewObject.ShowenProfileUserId);
      console.log("mainProfile> " + this.profileViewObject.UserId);
      this.ProfileViewSubscription = (await this.ProfileViewsService.create(this.profileViewObject))
        .subscribe((result: any) => {
          console.log("Viewers count> " + result.length);
        });
    }
  }
  bindHighLightsList() {
    if (this.userProfile) {
      //First Clear the highlisghtlist
      this.profileService.clearList(this.highLightsList);
      //then fill the list with the current profile values
      if (this.userProfile.gender) {
        this.highLightsList.push(this.userProfile.gender);
      }
      if (this.userProfile.mar_status) {
        this.highLightsList.push(this.userProfile.mar_status);
      }
      if (this.userProfile.childStatus) {
        this.highLightsList.push(this.userProfile.childStatus);
      }
      if (this.userProfile.sexuality) {
        this.highLightsList.push(this.userProfile.sexuality);
      }
      if (this.userProfile.religion) {
        this.highLightsList.push(this.userProfile.religion);
      }
      if (this.userProfile.ethnicity) {
        this.highLightsList.push(this.userProfile.ethnicity);
      }
      if (this.userProfile.pafflication) {
        this.highLightsList.push(this.userProfile.pafflication);
      }
      if (this.userProfile.disability) {
        this.highLightsList.push(this.userProfile.disability);
      }
      if (this.userProfile.height) {
        this.highLightsList.push(this.userProfile.height + ' Height');
      }
      if (this.userProfile.physique) {
        this.highLightsList.push(this.userProfile.physique + ' Physique');
      }
      if (this.userProfile.eye) {
        this.highLightsList.push(this.userProfile.eye + ' Eyes');
      }
      if (this.userProfile.hair) {
        this.highLightsList.push(this.userProfile.hair + ' Hair');
      }
      if (this.userProfile.smoke) {
        this.highLightsList.push(this.userProfile.smoke + ' Smoke');
      }
      if (this.userProfile.diet) {
        this.highLightsList.push(this.userProfile.diet + ' Diet');
      }
      if (this.userProfile.drink) {
        this.highLightsList.push(this.userProfile.drink + ' Drink');
      }
      if (this.userProfile.exercise) {
        this.highLightsList.push(this.userProfile.exercise + ' Exercise');
      }
      if (this.userProfile.highestEducation) {
        this.highLightsList.push(this.userProfile.highestEducation);
      }
      if (this.userProfile.profesional) {
        this.highLightsList.push(this.userProfile.profesional);
      }
      if (this.userProfile.occup) {
        this.highLightsList.push(this.userProfile.occup);
      }
      if (this.userProfile.profStatus) {
        this.highLightsList.push(this.userProfile.profStatus);
      }
      if (this.userProfile.income) {
        this.highLightsList.push(this.userProfile.income + ' Income');
      }
      if (this.userProfile.activitylevel) {
        this.highLightsList.push(this.userProfile.activitylevel);
      }
    }
  }
  bindTagsList() {
    //clear tags lisr
    this.profileService.clearList(this.tagsList);
    // fill the list
    if (this.userProfile.tag) {
      this.tags = this.userProfile.tag.split(",");
      if (this.tags.length > 0) {
        for (var i = 0; i < this.tags.length; i++) {
          this.tagsList.push(this.tags[i]);
        }
      }
    }
  }
  bindUsedChars() {
    if (this.userProfile) {
      this.userProfile.photoTagline ? this.photoTagLineRemainingChars = this.userProfile.photoTagline.length : this.photoTagLineRemainingChars = 0;
      this.userProfile.summary ? this.summaryRemainingChars = this.userProfile.summary.length : this.summaryRemainingChars = 0;
      this.userProfile.per_Info ? this.morePersonalRemainingChars = this.userProfile.per_Info.length : this.morePersonalRemainingChars = 0;
      this.userProfile.edu_info ? this.moreEducationRemainingChars = this.userProfile.edu_info.length : this.moreEducationRemainingChars = 0;
      this.userProfile.profinfo ? this.moreProfessionRemainingChars = this.userProfile.profinfo.length : this.moreProfessionRemainingChars = 0;
      this.userProfile.interstinfo ? this.moreInterestsRemainingChars = this.userProfile.interstinfo.length : this.moreInterestsRemainingChars = 0;
      this.userProfile.city ? this.cityRemainingChars = this.userProfile.city.length : this.cityRemainingChars = 0;
      this.userProfile.specialization ? this.specializationRemainingChars = this.userProfile.specialization.length : this.specializationRemainingChars = 0;
      this.userProfile.hschool ? this.highSchoolRemainingChars = this.userProfile.hschool.length : this.highSchoolRemainingChars = 0;
      this.userProfile.postgrade ? this.postGradRemainingChars = this.userProfile.postgrade.length : this.postGradRemainingChars = 0;
      this.userProfile.ucollege ? this.undergradCollegeRemainingChars = this.userProfile.ucollege.length : this.undergradCollegeRemainingChars = 0;
      this.userProfile.gradschool ? this.gradSchoolRemainingChars = this.userProfile.gradschool.length : this.gradSchoolRemainingChars = 0;
      this.userProfile.memeberof ? this.memberOfRemainingChars = this.userProfile.memeberof.length : this.memberOfRemainingChars = 0;
      this.userProfile.skill ? this.keySkillsRemainingChars = this.userProfile.skill.length : this.keySkillsRemainingChars = 0;
      this.userProfile.achieve ? this.mainAcheavmentRemainingChars = this.userProfile.achieve.length : this.mainAcheavmentRemainingChars = 0;
      this.userProfile.certifications ? this.coreCertificationRemainingChars = this.userProfile.certifications.length : this.coreCertificationRemainingChars = 0;
      this.userProfile.cemp ? this.currentEmployerRemainingChars = this.userProfile.cemp.length : this.currentEmployerRemainingChars = 0;
      this.userProfile.pemp ? this.pastEmployerRemainingChars = this.userProfile.pemp.length : this.pastEmployerRemainingChars = 0;
      this.userProfile.interest ? this.interestsRemainingChars = this.userProfile.interest.length : this.interestsRemainingChars = 0;
      this.userProfile.hobbies ? this.hobbiesRemainingChars = this.userProfile.hobbies.length : this.hobbiesRemainingChars = 0;
      this.userProfile.favoriteMusic ? this.favMusicRemainingChars = this.userProfile.favoriteMusic.length : this.favMusicRemainingChars = 0;
      this.userProfile.favoriteMovies ? this.favMoviesRemainingChars = this.userProfile.favoriteMovies.length : this.favMoviesRemainingChars = 0;
      this.userProfile.favoriteReads ? this.favrReadsRemainingChars = this.userProfile.favoriteReads.length : this.favrReadsRemainingChars = 0;
      this.userProfile.favoriteSports ? this.favSportsRemainingChars = this.userProfile.favoriteSports.length : this.favSportsRemainingChars = 0;
      this.userProfile.favoriteCuisines ? this.favCuisinesRemainingChars = this.userProfile.favoriteCuisines.length : this.favCuisinesRemainingChars = 0;
      this.userProfile.favoriteDressStyle ? this.favDressRemainingChars = this.userProfile.favoriteDressStyle.length : this.favDressRemainingChars = 0
      this.userProfile.favoriteOutings ? this.favOutingsRemainingChars = this.userProfile.favoriteOutings.length : this.favOutingsRemainingChars = 0;
      this.userProfile.tag ? this.tagRemainingChars = this.userProfile.tag.length : this.tagRemainingChars = 0;
      this.userProfile.phone ? this.phoneRemainingChars = this.userProfile.phone.length : this.phoneRemainingChars = 0;
      this.userProfile.contactMail ? this.contactMailRemainingChars = this.userProfile.contactMail.length : this.contactMailRemainingChars = 0;
      this.userProfile.website ? this.websiteRemainingChars = this.userProfile.website.length : this.websiteRemainingChars = 0;
      this.userProfile.messenger ? this.messangerRemainingChars = this.userProfile.messenger.length : this.messangerRemainingChars = 0;
      this.userProfile.other ? this.otherRemainingChars = this.userProfile.other.length : this.otherRemainingChars = 0;
    }
  }
  saveProfile(showToaster?: boolean) {
    console.log(this.ProfileForm.value);
    console.log(this.ProfileForm.dirty);
    this.EditMode = false;
    this.ReplcaseMultipleSpacesLinesBreak(false);
    this.userProfile.slang = this.AdjustCommasInString(this.userProfile.slang);
    this.userProfile.profileType = this.AdjustCommasInString(this.userProfile.profileType);
    !this.userProfile.zipcode ? this.userProfile.zipcode = 0 : this.userProfile.zipcode == this.userProfile.zipcode;
    console.log("zip code>> " + this.userProfile.zipcode);
    this.UpdateProfileSubscription = this.profileService.updateProfile(this.userProfile)
      .subscribe(() => {
        this.SaveCustomFields();
        this.SaveProfileSeeking();
        // this.SaveProfilePhotos('save');
        this.getUserProfile();
        this.spokenLangModified = false;
        this.profileTypeModified = false;
        if (showToaster) {
          this.Toster.success("Saved Successfuly");
        }
        this.isSaved = true;
      });
  }
  SaveProfileSeeking() {
    //Set seeking values
    this.SetProfileSeekingValues();
    this.ProfileViewSubscription = this.profileService.AddProfileSeeking(this.ProfileSeekingObject)
      .subscribe((result: any) => {
        if (result) {
          this.profileSeeking = result[0];
          this.seekingModified = false;
        }
      });
  }
  SetProfileSeekingValues() {
    this.ProfileSeekingObject = {} as appProfileSeeking;
    this.userProfile.id ? this.ProfileSeekingObject.userId = this.userProfile.id : this.ProfileSeekingObject.userId = 0;
    this.seekingGender != "" ? this.ProfileSeekingObject.gender = this.seekingGender : this.ProfileSeekingObject.gender = "";
    this.seekingMartialStatus != "" ? this.ProfileSeekingObject.ms = this.seekingMartialStatus : this.ProfileSeekingObject.ms = "";
    this.seekingChildren != "" ? this.ProfileSeekingObject.children = this.seekingChildren : this.ProfileSeekingObject.children = "";
    this.seekingSexuality != "" ? this.ProfileSeekingObject.sex = this.seekingSexuality : this.ProfileSeekingObject.sex = "";
    this.seekingReligion != "" ? this.ProfileSeekingObject.religion = this.seekingReligion : this.ProfileSeekingObject.religion = "";
    this.seekingEthnicity != "" ? this.ProfileSeekingObject.ethnicity = this.seekingEthnicity : this.ProfileSeekingObject.ethnicity = "";
    this.seekingPolitical != "" ? this.ProfileSeekingObject.political = this.seekingPolitical : this.ProfileSeekingObject.political = "";
    this.seekingDisplay != "" ? this.ProfileSeekingObject.disablity = this.seekingDisplay : this.ProfileSeekingObject.disablity = "";
    this.seekingIncome != "" ? this.ProfileSeekingObject.income = this.seekingIncome : this.ProfileSeekingObject.income = "";
    this.seekingHeight != "" ? this.ProfileSeekingObject.height = this.seekingHeight : this.ProfileSeekingObject.height = "";
    this.seekingPhysique != "" ? this.ProfileSeekingObject.physique = this.seekingPhysique : this.ProfileSeekingObject.physique = "";
    this.seekingEyes != "" ? this.ProfileSeekingObject.eyes = this.seekingEyes : this.ProfileSeekingObject.eyes = "";
    this.seekingHair != "" ? this.ProfileSeekingObject.hair = this.seekingHair : this.ProfileSeekingObject.hair = "";
    this.seekingDiet != "" ? this.ProfileSeekingObject.diet = this.seekingDiet : this.ProfileSeekingObject.diet = "";
    this.seekingDrink != "" ? this.ProfileSeekingObject.drink = this.seekingDrink : this.ProfileSeekingObject.drink = "";
    this.seekingSmoke != "" ? this.ProfileSeekingObject.smoke = this.seekingSmoke : this.ProfileSeekingObject.smoke = "";
    this.seekingExercise != "" ? this.ProfileSeekingObject.exercise = this.seekingExercise : this.ProfileSeekingObject.exercise = "";
    this.seekingLanguages != "" ? this.ProfileSeekingObject.slang = this.seekingLanguages : this.ProfileSeekingObject.slang = "";
    this.seekingHeightstEdu != "" ? this.ProfileSeekingObject.highestEdu = this.seekingHeightstEdu : this.ProfileSeekingObject.highestEdu = "";
    this.seekingProfession != "" ? this.ProfileSeekingObject.profession = this.seekingProfession : this.ProfileSeekingObject.profession = "";
    this.seekingSector != "" ? this.ProfileSeekingObject.sector = this.seekingSector : this.ProfileSeekingObject.sector = "";
    this.seekingIndustry != "" ? this.ProfileSeekingObject.industry = this.seekingIndustry : this.ProfileSeekingObject.industry = "";
    this.seekingprofStatus != "" ? this.ProfileSeekingObject.status = this.seekingprofStatus : this.ProfileSeekingObject.status = "";
    this.seekingActivityLevel != "" ? this.ProfileSeekingObject.activityLevel = this.seekingActivityLevel : this.ProfileSeekingObject.activityLevel = "";
    this.seekingCountry != "" ? this.ProfileSeekingObject.country = this.seekingCountry : this.ProfileSeekingObject.country = "";
    this.FromAge != "" && this.ToAge != "" ? this.ProfileSeekingObject.ageGroup = this.FromAge + "-" + this.ToAge : this.ProfileSeekingObject.ageGroup = "";
  }
  async BindProfileCustomFields() {
    if (this.userProfile) {
      this.CustomFieldsSubscription = (await this.ProfileCustomFieldsService.getById(this.userProfile.id))
        .subscribe((result: any) => {
          if (result) {
            this.ProfileCf = result[0];
            if (this.ProfileCf != null && this.ProfileCf != undefined) { this.LoadCustomFieldsBoxes(this.ProfileCf); }
          }
        }, (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage
        });
    }
  }
  LoadCustomFieldsBoxes(CustomProfileFields: appProfileCustomFields) {
    this.MoreCf.id = CustomProfileFields.id;
    this.MoreCf.tabName = CustomProfileFields.tabName;
    this.MoreCf.aCustomLabel1 = CustomProfileFields.aCustomLabel1;
    this.MoreCf.aCustomLabel2 = CustomProfileFields.aCustomLabel2;
    this.MoreCf.aCustomLabel3 = CustomProfileFields.aCustomLabel3;
    this.MoreCf.aCustomLabel4 = CustomProfileFields.aCustomLabel4;
    this.MoreCf.aCustomLabel5 = CustomProfileFields.aCustomLabel5;
    this.MoreCf.aCustomLabel6 = CustomProfileFields.aCustomLabel6;
    this.MoreCf.aCustomLabel7 = CustomProfileFields.aCustomLabel7;
    this.MoreCf.aCustomLabel8 = CustomProfileFields.aCustomLabel8;
    this.MoreCf.aCustomText1 = CustomProfileFields.aCustomText1;
    this.MoreCf.aCustomText2 = CustomProfileFields.aCustomText2;
    this.MoreCf.aCustomText3 = CustomProfileFields.aCustomText3;
    this.MoreCf.aCustomText4 = CustomProfileFields.aCustomText4;
    this.MoreCf.aCustomText5 = CustomProfileFields.aCustomText5;
    this.MoreCf.aCustomText6 = CustomProfileFields.aCustomText6;
    this.MoreCf.aCustomText7 = CustomProfileFields.aCustomText7;
    this.MoreCf.aCustomText8 = CustomProfileFields.aCustomText8;
    //set text default length
    if (this.MoreCf.aCustomText1.length <= 500) {
      this.ShownMore1 = this.MoreCf.aCustomText1
      this.viewMoreval1 = false
    }
    else {
      this.ShownMore1 = this.MoreCf.aCustomText1.substring(0, 500) + " ...";
      this.viewMoreval1 = true;
    }
    if (this.MoreCf.aCustomText2.length <= 500) {
      this.ShownMore2 = this.MoreCf.aCustomText2
      this.viewMoreval2 = false
    }
    else {
      this.ShownMore2 = this.MoreCf.aCustomText2.substring(0, 500) + " ...";
      this.viewMoreval2 = true;
    }
    if (this.MoreCf.aCustomText3.length <= 500) {
      this.ShownMore3 = this.MoreCf.aCustomText3
      this.viewMoreval3 = false
    }
    else {
      this.ShownMore3 = this.MoreCf.aCustomText3.substring(0, 500) + " ...";
      this.viewMoreval3 = true;
    }
    if (this.MoreCf.aCustomText4.length <= 500) {
      this.ShownMore4 = this.MoreCf.aCustomText4
      this.viewMoreval4 = false
    }
    else {
      this.ShownMore4 = this.MoreCf.aCustomText4.substring(0, 500) + " ...";
      this.viewMoreval4 = true;
    }
    if (this.MoreCf.aCustomText5.length <= 500) {
      this.ShownMore5 = this.MoreCf.aCustomText5
      this.viewMoreval5 = false
    }
    else {
      this.ShownMore5 = this.MoreCf.aCustomText5.substring(0, 500) + " ...";
      this.viewMoreval5 = true;
    }
    if (this.MoreCf.aCustomText6.length <= 500) {
      this.ShownMore6 = this.MoreCf.aCustomText6
      this.viewMoreval6 = false
    }
    else {
      this.ShownMore6 = this.MoreCf.aCustomText6.substring(0, 500) + " ...";
      this.viewMoreval6 = true;
    }
    if (this.MoreCf.aCustomText7.length <= 500) {
      this.ShownMore7 = this.MoreCf.aCustomText7
      this.viewMoreval7 = false
    }
    else {
      this.ShownMore7 = this.MoreCf.aCustomText7.substring(0, 500) + " ...";
      this.viewMoreval7 = true;
    }
    if (this.MoreCf.aCustomText8.length <= 500) {
      this.ShownMore8 = this.MoreCf.aCustomText8
      this.viewMoreval8 = false
    }
    else {
      this.ShownMore8 = this.MoreCf.aCustomText8.substring(0, 500) + " ...";
      this.viewMoreval8 = true;
    }
    //bind remaining chars
    this.MoreCf.aCustomLabel1 ? this.morelbl1RemainingChars = this.MoreCf.aCustomLabel1.length : this.morelbl1RemainingChars = 0;
    this.MoreCf.aCustomLabel2 ? this.morelbl2RemainingChars = this.MoreCf.aCustomLabel2.length : this.morelbl2RemainingChars = 0;
    this.MoreCf.aCustomLabel3 ? this.morelbl3RemainingChars = this.MoreCf.aCustomLabel3.length : this.morelbl3RemainingChars = 0;
    this.MoreCf.aCustomLabel4 ? this.morelbl4RemainingChars = this.MoreCf.aCustomLabel4.length : this.morelbl4RemainingChars = 0;
    this.MoreCf.aCustomLabel5 ? this.morelbl5RemainingChars = this.MoreCf.aCustomLabel5.length : this.morelbl5RemainingChars = 0;
    this.MoreCf.aCustomLabel6 ? this.morelbl6RemainingChars = this.MoreCf.aCustomLabel6.length : this.morelbl6RemainingChars = 0;
    this.MoreCf.aCustomLabel7 ? this.morelbl7RemainingChars = this.MoreCf.aCustomLabel7.length : this.morelbl7RemainingChars = 0;
    this.MoreCf.aCustomLabel8 ? this.morelbl8RemainingChars = this.MoreCf.aCustomLabel8.length : this.morelbl8RemainingChars = 0;
    this.MoreCf.aCustomText1 ? this.moreVlaue1RemainingChars = this.MoreCf.aCustomText1.length : this.moreVlaue1RemainingChars = 0;
    this.MoreCf.aCustomText2 ? this.moreVlaue2RemainingChars = this.MoreCf.aCustomText2.length : this.moreVlaue2RemainingChars = 0;
    this.MoreCf.aCustomText3 ? this.moreVlaue3RemainingChars = this.MoreCf.aCustomText3.length : this.moreVlaue3RemainingChars = 0;
    this.MoreCf.aCustomText4 ? this.moreVlaue4RemainingChars = this.MoreCf.aCustomText4.length : this.moreVlaue4RemainingChars = 0;
    this.MoreCf.aCustomText5 ? this.moreVlaue5RemainingChars = this.MoreCf.aCustomText5.length : this.moreVlaue5RemainingChars = 0;
    this.MoreCf.aCustomText6 ? this.moreVlaue6RemainingChars = this.MoreCf.aCustomText6.length : this.moreVlaue6RemainingChars = 0;
    this.MoreCf.aCustomText7 ? this.moreVlaue7RemainingChars = this.MoreCf.aCustomText7.length : this.moreVlaue7RemainingChars = 0;
    this.MoreCf.aCustomText8 ? this.moreVlaue8RemainingChars = this.MoreCf.aCustomText8.length : this.moreVlaue8RemainingChars = 0;
  }
  SaveCustomFields() {
    this.MoreCf.uid = +this.profileService.getProfileId();
    this.ReplcaseMultipleSpacesLinesBreak(true);
    this.UpdateCustomFieldsSubscription = this.ProfileCustomFieldsService.UpdateCusromFields(this.MoreCf)
      .subscribe(() => {
      });
  }
  ReplcaseMultipleSpacesLinesBreak(ismore: boolean) {
    if (ismore) {
      if (this.MoreCf && this.MoreCf !== undefined) {
        this.MoreCf.aCustomLabel1 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel1);
        this.MoreCf.aCustomLabel2 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel2);
        this.MoreCf.aCustomLabel3 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel3);
        this.MoreCf.aCustomLabel4 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel4);
        this.MoreCf.aCustomLabel5 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel5);
        this.MoreCf.aCustomLabel6 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel6);
        this.MoreCf.aCustomLabel7 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel7);
        this.MoreCf.aCustomLabel8 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomLabel8);
        this.MoreCf.aCustomText1 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText1);
        this.MoreCf.aCustomText2 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText2);
        this.MoreCf.aCustomText3 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText3);
        this.MoreCf.aCustomText4 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText4);
        this.MoreCf.aCustomText5 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText5);
        this.MoreCf.aCustomText6 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText6);
        this.MoreCf.aCustomText7 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText7);
        this.MoreCf.aCustomText8 = this.AdjustMyltipleSpacesLinesBreak(this.MoreCf.aCustomText8);
      }
    } else {
      this.userProfile.summary = this.AdjustMyltipleSpacesLinesBreak(this.userProfile.summary);
      this.userProfile.per_Info = this.AdjustMyltipleSpacesLinesBreak(this.userProfile.per_Info);
      this.userProfile.edu_info = this.AdjustMyltipleSpacesLinesBreak(this.userProfile.edu_info);
      this.userProfile.profinfo = this.AdjustMyltipleSpacesLinesBreak(this.userProfile.profinfo);
      this.userProfile.interstinfo = this.AdjustMyltipleSpacesLinesBreak(this.userProfile.interstinfo);
    }
  }
  //Function to remove multible ',' in a string
  AdjustCommasInString(value: string) {
    let adjustedValue = "";
    value = value.replace(/ , {1,}/g, ",");//remove repeated ', ' in between values
    value = value.replace(/,{2,}/g, ",");//remove repeated ',' in between values
    value = value.trim();//remove all spaces from the value
    value = value.charAt(0) === "," ? value.substring(1).trim() : value//remove , from start
    value = value.slice(-1) === "," ? value.slice(0, -1).trim() : value;//remove , from end
    value = value.split(",").join(", ");
    adjustedValue = value;
    return adjustedValue;
  }
  // Function to replace multiple spaces with one space and multiple break lines with one from big text fields
  AdjustMyltipleSpacesLinesBreak(value: string) {
    let adjustedValue = "";
    value = value.replace(/ {2,}/g, ' ').trim().replace(/[\r\n]{3,}/g, "\n\n");
    adjustedValue = value;
    return adjustedValue;
  }
  changeSelection(boxName: string, event) {
    switch (boxName) {
      case 'spoken':
        this.spokenLanguages = this.userProfile.slang;
        if (event.target.checked) {
          if (this.spokenLanguages.length === 0) {
            this.spokenLanguages = event.target.value;
          }
          else if (this.spokenLanguages.indexOf(event.target.value) === -1) {
            this.spokenLanguages += "," + event.target.value;
          }
        }
        else {
          if (this.spokenLanguages.length >= 0 && this.spokenLanguages.indexOf(event.target.value) !== -1) {
            this.spokenLanguages = this.spokenLanguages.replace(event.target.value, "");
          }
          if (this.spokenLanguages.length === 1 && this.spokenLanguages.indexOf(",") !== -1) {
            this.spokenLanguages = "";
          }
        }
        this.userProfile.slang = this.spokenLanguages;
        this.spokenLangModified = true;
        console.log("spoken Languages>> " + this.userProfile.slang);
        break;
      case 'profiletype':
        this.profileType = this.userProfile.profileType;
        console.log("values>> " + this.profileType);
        if (event.target.checked) {
          if (this.profileType.length === 0) {
            this.profileType = event.target.value;
          }
          else if (this.profileType.indexOf(event.target.value) === -1) {
            this.profileType += "," + event.target.value
          }
        }
        else {
          if (this.profileType.length >= 0 && this.profileType.indexOf(event.target.value) !== -1) {
            this.profileType = this.profileType.replace(event.target.value, "");
          }
          if (this.profileType.length === 1 && this.profileType.indexOf(",") !== -1) {
            this.profileType = "";
          }
        }
        this.userProfile.profileType = this.profileType;
        this.profileTypeModified = true;
        console.log("profile Type>> " + this.userProfile.profileType);
        break;
      case "seekingGender":
        this.profileSeeking !== null && this.profileSeeking !== undefined
          ? this.seekingGender = this.profileSeeking.gender
          : this.seekingGender == this.seekingGender;
        console.log("checked>> " + event.target.checked);
        if (event.target.checked) {
          if (this.seekingGender.length === 0) {
            this.seekingGender = event.target.value;
          }
          else {
            this.seekingGender.indexOf(event.target.value) === -1
              ? this.seekingGender += "," + event.target.value
              : this.seekingGender = this.seekingGender;
          }
        }
        else {
          if (this.seekingGender.length >= 0) {
            this.seekingGender.indexOf(event.target.value) != -1 ? this.seekingGender = this.seekingGender.replace(event.target.value, "") : this.seekingGender = this.seekingGender;
          }
          if (this.seekingGender.length === 1 && this.seekingGender.indexOf(",") != -1) {
            this.seekingGender = "";
          }
        }
        this.seekingGender = this.AdjustCommasInString(this.seekingGender);
        this.seekingModified = true;
        console.log("Seeking Gender>> " + this.seekingGender);
        break;
      case "seekingMaritalStatus":
        if (event.target.checked) {
          if (this.seekingMartialStatus.length === 0) {
            this.seekingMartialStatus = event.target.value;
          }
          else {
            this.seekingMartialStatus.indexOf(event.target.value) === -1
              ? this.seekingMartialStatus += "," + event.target.value
              : this.seekingMartialStatus = this.seekingMartialStatus;
          }
        }
        else {
          if (this.seekingMartialStatus.length >= 0) {
            this.seekingMartialStatus.indexOf(event.target.value) != -1 ? this.seekingMartialStatus = this.seekingMartialStatus.replace(event.target.value, "") : this.seekingMartialStatus = this.seekingMartialStatus;
          }
          if (this.seekingMartialStatus.length === 1 && this.seekingMartialStatus.indexOf(",") != -1) {
            this.seekingMartialStatus = "";
          }
        }
        this.seekingMartialStatus = this.AdjustCommasInString(this.seekingMartialStatus);
        this.seekingModified = true;
        console.log("seeking MartialStatus>> " + this.seekingMartialStatus);
        break;
      case "seekingChildren":
        if (event.target.checked) {
          if (this.seekingChildren.length === 0) {
            this.seekingChildren = event.target.value;
          }
          else {
            this.seekingChildren.indexOf(event.target.value) === -1
              ? this.seekingChildren += "," + event.target.value
              : this.seekingChildren = this.seekingChildren;
          }
        }
        else {
          if (this.seekingChildren.length >= 0) {
            this.seekingChildren.indexOf(event.target.value) != -1 ? this.seekingChildren = this.seekingChildren.replace(event.target.value, "") : this.seekingChildren = this.seekingChildren;

          }
          if (this.seekingChildren.length === 1 && this.seekingChildren.indexOf(",") != -1) {
            this.seekingChildren = "";
          }
        }
        this.seekingChildren = this.AdjustCommasInString(this.seekingChildren);
        this.seekingModified = true;
        console.log("seeking Children>> " + this.seekingChildren);
        break;
      case "seekingSexuality":
        if (event.target.checked) {
          if (this.seekingSexuality.length === 0) {
            this.seekingSexuality = event.target.value;
          }
          else {
            this.seekingSexuality.indexOf(event.target.value) === -1
              ? this.seekingSexuality += "," + event.target.value
              : this.seekingSexuality = this.seekingSexuality;
          }
        }
        else {
          if (this.seekingSexuality.length >= 0) {
            this.seekingSexuality.indexOf(event.target.value) != -1 ? this.seekingSexuality = this.seekingSexuality.replace(event.target.value, "") : this.seekingSexuality = this.seekingSexuality;
            this.seekingSexuality = this.seekingSexuality.replace(/,{2,}/g, ',')
          }
          if (this.seekingSexuality.length === 1 && this.seekingSexuality.indexOf(",") != -1) {
            this.seekingSexuality = "";
          }
        }
        console.log("seeking Sexuality>> " + this.seekingSexuality);
        this.seekingModified = true;
        break;
      case "seekingReligion":
        if (event.target.checked) {
          if (this.seekingReligion.length === 0) {
            this.seekingReligion = event.target.value;
          }
          else {
            this.seekingReligion.indexOf(event.target.value) === -1
              ? this.seekingReligion += "," + event.target.value
              : this.seekingReligion = this.seekingReligion;
          }
        }
        else {
          if (this.seekingReligion.length >= 0) {
            this.seekingReligion.indexOf(event.target.value) != -1 ? this.seekingReligion = this.seekingReligion.replace(event.target.value, "") : this.seekingReligion = this.seekingReligion;
            this.seekingReligion = this.seekingReligion.replace(/,{2,}/g, ',')
          }
          if (this.seekingReligion.length === 1 && this.seekingReligion.indexOf(",") != -1) {
            this.seekingReligion = "";
          }
        }
        console.log("seeking Religion>> " + this.seekingReligion);
        this.seekingModified = true;
        break;
      case "seekingEthnicity":
        if (event.target.checked) {
          if (this.seekingEthnicity.length === 0) {
            this.seekingEthnicity = event.target.value;
          }
          else {
            this.seekingEthnicity.indexOf(event.target.value) === -1
              ? this.seekingEthnicity += "," + event.target.value
              : this.seekingEthnicity = this.seekingEthnicity;
          }
        }
        else {
          if (this.seekingEthnicity.length >= 0) {
            this.seekingEthnicity.indexOf(event.target.value) != -1 ? this.seekingEthnicity = this.seekingEthnicity.replace(event.target.value, "") : this.seekingEthnicity = this.seekingEthnicity;
            this.seekingEthnicity = this.seekingReligion.replace(/,{2,}/g, ',')
          }
          if (this.seekingEthnicity.length === 1 && this.seekingEthnicity.indexOf(",") != -1) {
            this.seekingEthnicity = "";
          }
        }
        console.log("seeking Ethnicity>> " + this.seekingEthnicity);
        this.seekingModified = true;
        break;
      case "seekingPolitical":
        if (event.target.checked) {
          if (this.seekingPolitical.length === 0) {
            this.seekingPolitical = event.target.value;
          }
          else {
            this.seekingPolitical.indexOf(event.target.value) === -1
              ? this.seekingPolitical += "," + event.target.value
              : this.seekingPolitical = this.seekingPolitical;
          }
        }
        else {
          if (this.seekingPolitical.length >= 0) {
            this.seekingPolitical.indexOf(event.target.value) != -1 ? this.seekingPolitical = this.seekingPolitical.replace(event.target.value, "") : this.seekingPolitical = this.seekingPolitical;
            this.seekingPolitical = this.seekingReligion.replace(/,{2,}/g, ',')
          }
          if (this.seekingPolitical.length === 1 && this.seekingPolitical.indexOf(",") != -1) {
            this.seekingPolitical = "";
          }
        }
        console.log("seeking Political>> " + this.seekingPolitical);
        this.seekingModified = true;
        break;
      case "seekingDisplay":
        if (event.target.checked) {
          if (this.seekingDisplay.length === 0) {
            this.seekingDisplay = event.target.value;
          }
          else {
            this.seekingDisplay.indexOf(event.target.value) === -1
              ? this.seekingDisplay += "," + event.target.value
              : this.seekingDisplay = this.seekingDisplay;
          }
        }
        else {
          if (this.seekingDisplay.length >= 0) {
            this.seekingDisplay.indexOf(event.target.value) != -1 ? this.seekingDisplay = this.seekingDisplay.replace(event.target.value, "") : this.seekingDisplay = this.seekingDisplay;
            this.seekingDisplay = this.seekingDisplay.replace(/,{2,}/g, ',')
          }
          if (this.seekingDisplay.length === 1 && this.seekingDisplay.indexOf(",") != -1) {
            this.seekingDisplay = "";
          }
        }
        console.log("seeking Display>> " + this.seekingDisplay);
        this.seekingModified = true;
        break;
      case "seekingHeight":
        if (event.target.checked) {
          if (this.seekingHeight.length === 0) {
            this.seekingHeight = event.target.value;
          }
          else {
            this.seekingHeight.indexOf(event.target.value) === -1
              ? this.seekingHeight += "," + event.target.value
              : this.seekingHeight = this.seekingHeight;
          }
        }
        else {
          if (this.seekingHeight.length >= 0) {
            this.seekingHeight.indexOf(event.target.value) != -1 ? this.seekingHeight = this.seekingHeight.replace(event.target.value, "") : this.seekingHeight = this.seekingHeight;
            this.seekingHeight = this.seekingHeight.replace(/,{2,}/g, ',')
          }
          if (this.seekingHeight.length === 1 && this.seekingHeight.indexOf(",") != -1) {
            this.seekingHeight = "";
          }
        }
        console.log("seeking Height>> " + this.seekingHeight);
        this.seekingModified = true;
        break;
      case "seekingPhysique":
        if (event.target.checked) {
          if (this.seekingPhysique.length === 0) {
            this.seekingPhysique = event.target.value;
          }
          else {
            this.seekingPhysique.indexOf(event.target.value) === -1
              ? this.seekingPhysique += "," + event.target.value
              : this.seekingPhysique = this.seekingPhysique;
          }
        }
        else {
          if (this.seekingPhysique.length >= 0) {
            this.seekingPhysique.indexOf(event.target.value) != -1 ? this.seekingPhysique = this.seekingPhysique.replace(event.target.value, "") : this.seekingPhysique = this.seekingPhysique;
            this.seekingPhysique = this.seekingPhysique.replace(/,{2,}/g, ',')
          }
          if (this.seekingPhysique.length === 1 && this.seekingPhysique.indexOf(",") != -1) {
            this.seekingPhysique = "";
          }
        }
        console.log("seeking Physique>> " + this.seekingPhysique);
        this.seekingModified = true;
        break;
      case "seekingEyes":
        if (event.target.checked) {
          if (this.seekingEyes.length === 0) {
            this.seekingEyes = event.target.value;
          }
          else {
            this.seekingEyes.indexOf(event.target.value) === -1
              ? this.seekingEyes += "," + event.target.value
              : this.seekingEyes = this.seekingEyes;
          }
        }
        else {
          if (this.seekingEyes.length >= 0) {
            this.seekingEyes.indexOf(event.target.value) != -1 ? this.seekingEyes = this.seekingEyes.replace(event.target.value, "") : this.seekingEyes = this.seekingEyes;
            this.seekingEyes = this.seekingEyes.replace(/,{2,}/g, ',')
          }
          if (this.seekingEyes.length === 1 && this.seekingEyes.indexOf(",") != -1) {
            this.seekingEyes = "";
          }
        }
        console.log("seeking Eyes>> " + this.seekingEyes);
        this.seekingModified = true;
        break;
      case "seekingHair":
        if (event.target.checked) {
          if (this.seekingHair.length === 0) {
            this.seekingHair = event.target.value;
          }
          else {
            this.seekingHair.indexOf(event.target.value) === -1
              ? this.seekingHair += "," + event.target.value
              : this.seekingHair = this.seekingHair;
          }
        }
        else {
          if (this.seekingHair.length >= 0) {
            this.seekingHair.indexOf(event.target.value) != -1 ? this.seekingHair = this.seekingHair.replace(event.target.value, "") : this.seekingHair = this.seekingHair;
            this.seekingHair = this.seekingHair.replace(/,{2,}/g, ',')
          }
          if (this.seekingHair.length === 1 && this.seekingHair.indexOf(",") != -1) {
            this.seekingHair = "";
          }
        }
        console.log("seeking Hair>> " + this.seekingHair);
        this.seekingModified = true;
        break;
      case "seekingDiet":
        if (event.target.checked) {
          if (this.seekingDiet.length === 0) {
            this.seekingDiet = event.target.value;
          }
          else {
            this.seekingDiet.indexOf(event.target.value) === -1
              ? this.seekingDiet += "," + event.target.value
              : this.seekingDiet = this.seekingDiet;
          }
        }
        else {
          if (this.seekingDiet.length >= 0) {
            this.seekingDiet.indexOf(event.target.value) != -1 ? this.seekingDiet = this.seekingDiet.replace(event.target.value, "") : this.seekingDiet = this.seekingDiet;
            this.seekingDiet = this.seekingDiet.replace(/,{2,}/g, ',')
          }
          if (this.seekingDiet.length === 1 && this.seekingDiet.indexOf(",") != -1) {
            this.seekingDiet = "";
          }
        }
        console.log("seeking Political>> " + this.seekingDiet);
        this.seekingModified = true;
        break;
      case "seekingDrink":
        if (event.target.checked) {
          if (this.seekingDrink.length === 0) {
            this.seekingDrink = event.target.value;
          }
          else {
            this.seekingDrink.indexOf(event.target.value) === -1
              ? this.seekingDrink += "," + event.target.value
              : this.seekingDrink = this.seekingDrink;
          }
        }
        else {
          if (this.seekingDrink.length >= 0) {
            this.seekingDrink.indexOf(event.target.value) != -1 ? this.seekingDrink = this.seekingDrink.replace(event.target.value, "") : this.seekingDrink = this.seekingDrink;
            this.seekingDrink = this.seekingDrink.replace(/,{2,}/g, ',')
          }
          if (this.seekingDrink.length === 1 && this.seekingDrink.indexOf(",") != -1) {
            this.seekingDrink = "";
          }
        }
        console.log("seeking Drink>> " + this.seekingDrink);
        this.seekingModified = true;
        break;
      case "seekingSmoke":
        if (event.target.checked) {
          if (this.seekingSmoke.length === 0) {
            this.seekingSmoke = event.target.value;
          }
          else {
            this.seekingSmoke.indexOf(event.target.value) === -1
              ? this.seekingSmoke += "," + event.target.value
              : this.seekingSmoke = this.seekingSmoke;
          }
        }
        else {
          if (this.seekingSmoke.length >= 0) {
            this.seekingSmoke.indexOf(event.target.value) != -1 ? this.seekingSmoke = this.seekingSmoke.replace(event.target.value, "") : this.seekingSmoke = this.seekingSmoke;
            this.seekingSmoke = this.seekingSmoke.replace(/,{2,}/g, ',')
          }
          if (this.seekingSmoke.length === 1 && this.seekingSmoke.indexOf(",") != -1) {
            this.seekingSmoke = "";
          }
        }
        console.log("seeking Smoke>> " + this.seekingSmoke);
        this.seekingModified = true;
        break;
      case "seekingExercise":
        if (event.target.checked) {
          if (this.seekingExercise.length === 0) {
            this.seekingExercise = event.target.value;
          }
          else {
            this.seekingExercise.indexOf(event.target.value) === -1
              ? this.seekingExercise += "," + event.target.value
              : this.seekingExercise = this.seekingExercise;
          }
        }
        else {
          if (this.seekingExercise.length >= 0) {
            this.seekingExercise.indexOf(event.target.value) != -1 ? this.seekingExercise = this.seekingExercise.replace(event.target.value, "") : this.seekingExercise = this.seekingExercise;
            this.seekingExercise = this.seekingExercise.replace(/,{2,}/g, ',')
          }
          if (this.seekingExercise.length === 1 && this.seekingExercise.indexOf(",") != -1) {
            this.seekingExercise = "";
          }
        }
        console.log("seeking Exercise>> " + this.seekingExercise);
        this.seekingModified = true;
        break;
      case "seekingLangs":
        if (event.target.checked) {
          if (this.seekingLanguages.length === 0) {
            this.seekingLanguages = event.target.value;
          }
          else {
            this.seekingLanguages.indexOf(event.target.value) === -1
              ? this.seekingLanguages += "," + event.target.value
              : this.seekingLanguages = this.seekingLanguages;
          }
        }
        else {
          if (this.seekingLanguages.length >= 0) {
            this.seekingLanguages.indexOf(event.target.value) != -1 ? this.seekingLanguages = this.seekingLanguages.replace(event.target.value, "") : this.seekingLanguages = this.seekingLanguages;
            this.seekingLanguages = this.seekingLanguages.replace(/,{2,}/g, ',')
          }
          if (this.seekingLanguages.length === 1 && this.seekingLanguages.indexOf(",") != -1) {
            this.seekingLanguages = "";
          }
        }
        console.log("seeking Languages>> " + this.seekingLanguages);
        this.seekingModified = true;
        break;
      case "seekingCountry":
        if (event.target.checked) {
          if (this.seekingCountry.length === 0) {
            this.seekingCountry = event.target.value;
          }
          else {
            this.seekingCountry.indexOf(event.target.value) === -1
              ? this.seekingCountry += "," + event.target.value
              : this.seekingCountry = this.seekingCountry;
          }
        }
        else {
          if (this.seekingCountry.length >= 0) {
            this.seekingCountry.indexOf(event.target.value) != -1 ? this.seekingCountry = this.seekingCountry.replace(event.target.value, "") : this.seekingCountry = this.seekingCountry;
            this.seekingCountry = this.seekingCountry.replace(/,{2,}/g, ',')
          }
          if (this.seekingCountry.length === 1 && this.seekingCountry.indexOf(",") != -1) {
            this.seekingCountry = "";
          }
        }
        console.log("seekingCountry>> " + this.seekingCountry);
        this.seekingModified = true;
        break;
      case "seekingHighestedu":
        if (event.target.checked) {
          if (this.seekingHeightstEdu.length === 0) {
            this.seekingHeightstEdu = event.target.value;
          }
          else {
            this.seekingHeightstEdu.indexOf(event.target.value) === -1
              ? this.seekingHeightstEdu += "," + event.target.value
              : this.seekingHeightstEdu = this.seekingHeightstEdu;
          }
        }
        else {
          if (this.seekingHeightstEdu.length >= 0) {
            this.seekingHeightstEdu.indexOf(event.target.value) != -1 ? this.seekingHeightstEdu = this.seekingHeightstEdu.replace(event.target.value, "") : this.seekingHeightstEdu = this.seekingHeightstEdu;
            this.seekingHeightstEdu = this.seekingHeightstEdu.replace(/,{2,}/g, ',')
          }
          if (this.seekingHeightstEdu.length === 1 && this.seekingHeightstEdu.indexOf(",") != -1) {
            this.seekingHeightstEdu = "";
          }
        }
        console.log("seeking HeightstEdu>> " + this.seekingHeightstEdu);
        this.seekingModified = true;
        break;
      case "seekingProfession":
        if (event.target.checked) {
          if (this.seekingProfession.length === 0) {
            this.seekingProfession = event.target.value;
          }
          else {
            this.seekingProfession.indexOf(event.target.value) === -1
              ? this.seekingProfession += "," + event.target.value
              : this.seekingProfession = this.seekingProfession;
          }
        }
        else {
          if (this.seekingProfession.length >= 0) {
            this.seekingProfession.indexOf(event.target.value) != -1 ? this.seekingProfession = this.seekingProfession.replace(event.target.value, "") : this.seekingProfession = this.seekingProfession;
            this.seekingProfession = this.seekingProfession.replace(/,{2,}/g, ',')
          }
          if (this.seekingProfession.length === 1 && this.seekingProfession.indexOf(",") != -1) {
            this.seekingProfession = "";
          }
        }
        console.log("seeking Profession>> " + this.seekingProfession);
        this.seekingModified = true;
        break;
      case "seekingSector":
        if (event.target.checked) {
          if (this.seekingSector.length === 0) {
            this.seekingSector = event.target.value;
          }
          else {
            this.seekingSector.indexOf(event.target.value) === -1
              ? this.seekingSector += "," + event.target.value
              : this.seekingSector = this.seekingSector;
          }
        }
        else {
          if (this.seekingSector.length >= 0) {
            this.seekingSector.indexOf(event.target.value) != -1 ? this.seekingSector = this.seekingSector.replace(event.target.value, "") : this.seekingSector = this.seekingSector;
            this.seekingSector = this.seekingSector.replace(/,{2,}/g, ',')
          }
          if (this.seekingSector.length === 1 && this.seekingSector.indexOf(",") != -1) {
            this.seekingSector = "";
          }
        }
        console.log("seeking Sector>> " + this.seekingSector);
        this.seekingModified = true;
        break;
      case "seekingIndustry":
        if (event.target.checked) {
          if (this.seekingIndustry.length === 0) {
            this.seekingIndustry = event.target.value;
          }
          else {
            this.seekingIndustry.indexOf(event.target.value) === -1
              ? this.seekingIndustry += "," + event.target.value
              : this.seekingIndustry = this.seekingIndustry;
          }
        }
        else {
          if (this.seekingIndustry.length >= 0) {
            this.seekingIndustry.indexOf(event.target.value) != -1 ? this.seekingIndustry = this.seekingIndustry.replace(event.target.value, "") : this.seekingIndustry = this.seekingIndustry;
            this.seekingIndustry = this.seekingIndustry.replace(/,{2,}/g, ',')
          }
          if (this.seekingIndustry.length === 1 && this.seekingIndustry.indexOf(",") != -1) {
            this.seekingIndustry = "";
          }
        }
        console.log("seeking Industry>> " + this.seekingIndustry);
        this.seekingModified = true;
        break;
      case "seekingProfstatus":
        if (event.target.checked) {
          if (this.seekingprofStatus.length === 0) {
            this.seekingprofStatus = event.target.value;
          }
          else {
            this.seekingprofStatus.indexOf(event.target.value) === -1
              ? this.seekingprofStatus += "," + event.target.value
              : this.seekingprofStatus = this.seekingprofStatus;
          }
        }
        else {
          if (this.seekingprofStatus.length >= 0) {
            this.seekingprofStatus.indexOf(event.target.value) != -1 ? this.seekingprofStatus = this.seekingprofStatus.replace(event.target.value, "") : this.seekingprofStatus = this.seekingprofStatus;
            this.seekingprofStatus = this.seekingprofStatus.replace(/,{2,}/g, ',')
          }
          if (this.seekingprofStatus.length === 1 && this.seekingprofStatus.indexOf(",") != -1) {
            this.seekingprofStatus = "";
          }
        }
        console.log("seeking profStatus>> " + this.seekingprofStatus);
        this.seekingModified = true;
        break;
      case "seekingIncome":
        if (event.target.checked) {
          if (this.seekingIncome.length === 0) {
            this.seekingIncome = event.target.value;
          }
          else {
            this.seekingIncome.indexOf(event.target.value) === -1
              ? this.seekingIncome += "," + event.target.value
              : this.seekingIncome = this.seekingIncome;
          }
        }
        else {
          if (this.seekingIncome.length >= 0) {
            this.seekingIncome.indexOf(event.target.value) != -1 ? this.seekingIncome = this.seekingIncome.replace(event.target.value, "") : this.seekingIncome = this.seekingIncome;
            this.seekingIncome = this.seekingIncome.replace(/,{2,}/g, ',')
          }
          if (this.seekingIncome.length === 1 && this.seekingIncome.indexOf(",") != -1) {
            this.seekingIncome = "";
          }
        }
        console.log("seeking Income>> " + this.seekingIncome);
        this.seekingModified = true;
        break;
      case "seekingActivity":
        if (event.target.checked) {
          if (this.seekingActivityLevel.length === 0) {
            this.seekingActivityLevel = event.target.value;
          }
          else {
            this.seekingActivityLevel.indexOf(event.target.value) === -1
              ? this.seekingActivityLevel += "," + event.target.value
              : this.seekingActivityLevel = this.seekingActivityLevel;
          }
        }
        else {
          if (this.seekingActivityLevel.length >= 0) {
            this.seekingActivityLevel.indexOf(event.target.value) != -1 ? this.seekingActivityLevel = this.seekingActivityLevel.replace(event.target.value, "") : this.seekingActivityLevel = this.seekingActivityLevel;
            this.seekingActivityLevel = this.seekingActivityLevel.replace(/,{2,}/g, ',')
          }
          if (this.seekingActivityLevel.length === 1 && this.seekingActivityLevel.indexOf(",") != -1) {
            this.seekingActivityLevel = "";
          }
        }
        console.log("seeking ActivityLevel>> " + this.seekingActivityLevel);
        this.seekingModified = true;
        break;
    }
  }
  GetFromAge(event) {
    this.FromAge = event.target.value;
    console.log("From age>> " + this.FromAge);
  }
  GetToAge(event) {
    this.ToAge = event.target.value;
    console.log("To age>> " + this.ToAge);
  }
  BindOnlineStatus() {
    if (this.profileOwner) {
      this.finalValue = "Online Now";
    }
    else {
      if (this.userProfile.lastonline) {
        let Minutes = moment().diff(this.userProfile.lastonline, "minutes");
        let Hours = moment().diff(this.userProfile.lastonline, "hours");
        let Days = moment().diff(this.userProfile.lastonline, "days");
        let Months = moment().diff(this.userProfile.lastonline, "months");
        let Years = moment().diff(this.userProfile.lastonline, "years");
        console.log("Minutes: " + Minutes + "..." + "Hours: " + Hours + "..." + "Days: " + Days + "..." + "Months: " + Months + "..." + "Years: " + Years);
        if (Days > 0) {
          if (Days >= 1 && Days <= 7) {
            this.finalValue = "Quite Active (online in last 1-7 days)";
          }
          else if (Days > 7 && Days <= 30) {
            this.finalValue = "Sometimes Active (online in last 7-30 days)";
          }
          else if (Days > 30 && Days <= 180) {
            this.finalValue = "Rarely Active (online in last 30-180 days)";
          }
          else if (Days > 30 && Days <= 180) {
            this.finalValue = "Rarely Active (online within last 30-180 days)";
          }
          else if (Days > 180 && Days <= 360) {
            this.finalValue = "Not Active (online in last 180-360 days)";
          }
          else if (Days > 360) {
            this.finalValue = "Not Available (online more than one year ago)";
          }
        }
        else if (Hours > 0) {
          if (Hours > 1 && Hours < 24) {
            this.finalValue = "Very Active (online in last 24 hours)";
          }
        }
        else {
          this.finalValue = "Online Now";
        }
      }
      else {
        this.finalValue = "Not Online Right Now";
      }
    }
  }
  LoadProfileSeekings() {
    this.ProfileViewSubscription = this.profileService.GetProfileSeeking(this.userProfile.id)
      .subscribe((result: any) => {
        if (result) {
          this.profileSeeking = result[0];
          console.log("profileSeeking gender>> ", this.profileSeeking.gender);
          if (this.profileSeeking !== null && this.profileSeeking !== undefined) {
            console.log("this.profileSeeking gender>> " + this.profileSeeking.gender);
            console.log("this.profileSeeking ms>> " + this.profileSeeking.ms);
            //Bind Profile seeking Group Values
            this.SetProfileSeekingGroupValues();
            //Bind seeking variables 
            // this.BindProfileSeekingValues();
          }
        }
      });
  }
  IsSelectedValues(fieldName: string, value: string): boolean {
    if (this.profileSeeking === null || this.profileSeeking === undefined) {
      this.isSelected = false;
    }
    else {
      switch (fieldName) {
        case "age":
          this.profileSeeking.ageGroup.indexOf(value) !== -1 ? this.isSelected = true : this.isSelected = false;
          break;
        case "gender":
          this.profileSeeking.gender.indexOf(value) !== -1 ? this.isSelected = true : this.isSelected = false;
          break;
      }
    }
    return this.isSelected;
  }
  BindProfileSeekingValues() {
    if (this.profileSeeking != null && this.profileSeeking != undefined) {
      this.profileSeeking.ageGroup != "" ? this.FromAge = this.profileSeeking.ageGroup.substring(0, this.profileSeeking.ageGroup.indexOf("-")) : this.FromAge = "";
      this.profileSeeking.ageGroup != "" ? this.ToAge = this.profileSeeking.ageGroup.substring(this.profileSeeking.ageGroup.indexOf("-") + 1, this.profileSeeking.ageGroup.length) : this.ToAge = "";
      console.log("FromAge>> " + this.FromAge);
      console.log("ToAge>> " + this.ToAge);
      this.profileSeeking.gender != "" ? this.seekingGender = this.profileSeeking.gender : this.seekingGender == "";
      this.profileSeeking.children != "" ? this.seekingChildren = this.profileSeeking.children : this.seekingChildren = "";
      this.profileSeeking.sex != "" ? this.seekingSexuality = this.profileSeeking.sex : this.seekingSexuality = "";
      this.profileSeeking.religion != "" ? this.seekingReligion = this.profileSeeking.religion : this.seekingReligion = "";
      this.profileSeeking.ethnicity != "" ? this.seekingEthnicity = this.profileSeeking.ethnicity : this.seekingEthnicity = "";
      this.profileSeeking.political != "" ? this.seekingPolitical = this.profileSeeking.political : this.seekingPolitical = "";
      this.profileSeeking.disablity != "" ? this.seekingDisplay = this.profileSeeking.disablity : this.seekingDisplay = "";
      this.profileSeeking.height != "" ? this.seekingHeight = this.profileSeeking.height : this.seekingHeight = "";
      this.profileSeeking.physique != "" ? this.seekingPhysique = this.profileSeeking.physique : this.seekingPhysique = "";
      this.profileSeeking.eyes != "" ? this.seekingEyes = this.profileSeeking.eyes : this.seekingEyes = "";
      this.profileSeeking.hair != "" ? this.seekingHair = this.profileSeeking.hair : this.seekingHair = "";
      this.profileSeeking.diet != "" ? this.seekingDiet = this.profileSeeking.diet : this.seekingDiet = "";
      this.profileSeeking.drink != "" ? this.seekingDrink = this.profileSeeking.drink : this.seekingDrink = "";
      this.profileSeeking.smoke != "" ? this.seekingSmoke = this.profileSeeking.smoke : this.seekingSmoke = "";
      this.profileSeeking.exercise != "" ? this.seekingExercise = this.profileSeeking.exercise : this.seekingExercise = "";
      this.profileSeeking.country != "" ? this.seekingCountry = this.profileSeeking.country : this.seekingCountry = "";
      this.profileSeeking.slang != "" ? this.seekingLanguages = this.profileSeeking.slang : this.seekingLanguages = "";
      this.profileSeeking.highestEdu != "" ? this.seekingHeightstEdu = this.profileSeeking.highestEdu : this.seekingHeightstEdu = "";
      this.profileSeeking.profession != "" ? this.seekingProfession = this.profileSeeking.profession : this.seekingProfession = "";
      this.profileSeeking.sector != "" ? this.seekingSector = this.profileSeeking.sector : this.seekingSector = "";
      this.profileSeeking.income != "" ? this.seekingIncome = this.profileSeeking.income : this.seekingIncome = "";
      this.profileSeeking.industry != "" ? this.seekingIndustry = this.profileSeeking.industry : this.seekingIndustry = "";
      this.profileSeeking.status != "" ? this.seekingprofStatus = this.profileSeeking.status : this.seekingprofStatus = "";
      this.profileSeeking.activityLevel != "" ? this.seekingActivityLevel = this.profileSeeking.activityLevel : this.seekingActivityLevel = "";
    }
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
  CheckMessageHistoryBetweenUsers() {
    let mesg: appMessages[] = [];
    if (!this.profileOwner && this.authService.isLoggedIn()) {
      this.SetThreadEndpoints();
      this.MessageSubscription = this.messagesService.CheckNewThread(this.resource)
        .subscribe((result: any) => {
          if (result && result !== undefined) {
            mesg = result;
            if (mesg.length > 0) {
              this.ThreadId = mesg[0].id;
              console.log("ThreadId> " + this.ThreadId);
              if (mesg[0].deleteIds.length === 0 || mesg[0].deleteIds.indexOf(this.messagesService.getProfileId()) === -1) {
                console.log("has history");
                this.hasMessageHistory = true;
              }
            }
          }
        });
    }
  }
  goInbox() {
    this.router.navigate(['/Messages/', this.currentUser.uName]);
  }
  //fun to check user account type and return the limits accordsing to the action ex.. like/fav/send mesg etc
  CheckLimits() {
    this.DailyLimit = this.messagesService.GetLimits("daily", this.limits, this.upgrade);
    this.LifeTimeLimit = this.messagesService.GetLimits("lifetime", this.limits, this.upgrade);
  }
  FillNewMessage(SenderId, ReciverId): appMessages {
    this.NewMessage.senderId = SenderId;
    this.NewMessage.receiverId = ReciverId;
    this.NewMessage.date = new Date();
    this.NewMessage.sname = this.localStorage.getItem("Sname");
    this.NewMessage.rname = this.userProfile.sname;
    return this.NewMessage;
  }
  FillNewMessageThread(newInsertedMessage: appMessages): appMessageThreads {
    this.NewMessageThread.threadId = newInsertedMessage.id;
    this.NewMessageThread.senderId = newInsertedMessage.senderId;
    this.NewMessageThread.receiverId = newInsertedMessage.receiverId;
    this.NewMessageThread.message = this.messageBody;
    this.NewMessageThread.sname = newInsertedMessage.sname;
    this.NewMessageThread.rname = newInsertedMessage.rname;
    return this.NewMessageThread;
  }
  //set sender,reciever data to check thread between them
  SetThreadEndpoints() {
    this.resource.SenderId = +this.messagesService.getProfileId();
    this.resource.ReceiverId = this.userProfile.id;
    console.log("Sender>> " + this.resource.SenderId + "..." + "Reciver>> " + this.resource.ReceiverId);
  }
  SendMessage() {
    this.SetThreadEndpoints();
    this.MessageSubscription = this.messagesService.CheckNewThread(this.resource)
      .subscribe((result: any) => {
        if (result) {
          this.MessageThread = result;
          console.log("check if new thread result length >>" + this.MessageThread.length);
          if (this.MessageThread.length === 0) {//new thread
            //check limits
            this.CheckLimits();
            this.CheckCreditsSubscription = this.messagesService.CheckMessageCredit(this.messagesService.getProfileId())
              .subscribe((result: any) => {
                if (result) {
                  this.CreditMesg = result;
                  console.log("credit count > " + this.CreditMesg.length);
                  if (this.CreditMesg.length === 0 || this.CreditMesg.length < this.DailyLimit) {
                    this.NewMessageSubscription = this.messagesService.AddNewMessage(this.FillNewMessage(this.resource.SenderId, this.resource.ReceiverId))
                      .subscribe((result: any) => {
                        this.InsertedMessage = result[0];
                        console.log("the new inserted message object when new message >> " + this.InsertedMessage);
                        console.log("new message ID>> " + this.InsertedMessage.id);
                        console.log("the filled new  message thread object>> " + this.FillNewMessageThread(this.InsertedMessage));
                        //Add message thread
                        this.MessageThreadSubscription = this.messagesService.AddNewMessageThread(this.FillNewMessageThread(this.InsertedMessage))
                          .subscribe(() => {
                            this.Toster.success("Message sent successfuly");
                            this.isUsedFullMesgCredit = false;
                            this.messageBody = "";
                          });
                        //add Like profile
                        this.ProfileLikedFavedSentObject.isLiked = 1;
                        this.LikeUnLikeFavUnFav = this.IsLikedService.LikeUnLike(this.SetProfileLikedFavedObject())
                          .subscribe(result => {
                            if (result) {
                              console.log("profile like added");
                            }
                          });
                      });
                  }
                  else {
                    console.log("used all ur credit");
                    this.isUsedFullMesgCredit = true;
                    this.messageBody = "";
                    this.Toster.error("You usesd all your credits.");
                    return false;
                  }
                }
              });
          }
          else {//update current thread
            console.log("update message");
            console.log("current message ID>> " + this.MessageThread[0].id);
            this.CheckSpamMessage(this.MessageThread[0].id);
          }
        }
      });
  }
  ReplyMessage(threadId) {
    console.log("thread id from restore >> " + this.ThreadId);
    //first remove deletion if the current user removed the thread before
    let message = { id: this.ThreadId, SenderId: +this.messagesService.getProfileId() }
    this.MessageSubscription = this.messagesService.UpdateDeleteMessageStatus(message)
      .subscribe((result: any) => {
        if (result) {
          console.log("Message delete status updated successfully");
        }
      });
    //send the messagel
    this.RepliedMessage = {} as appMessageThreads;
    this.RepliedMessage.threadId = threadId;
    this.RepliedMessage.message = this.messageBody;
    this.RepliedMessage.senderId = +this.messagesService.getUserId();
    this.RepliedMessage.sname = this.localStorage.getItem("Sname");
    this.RepliedMessage.receiverId = this.userProfile.user_Id;
    this.RepliedMessage.rname = this.userProfile.sname;
    this.MessageThreadSubscription = this.messagesService.ReplyMessage(this.RepliedMessage)
      .subscribe(() => {
        this.messageBody = "";
        this.Toster.success("Message sent successfuly");
      });
  }
  CheckSpamMessage(threadId) {
    this.MessageSubscription = this.messagesService.CheckIfSpam(threadId)
      .subscribe((result: any) => {
        if (result) {
          this.spamMessage = result;
          if (this.spamMessage.length >= 5) {
            for (var i = 0; i < this.spamMessage.length; i++) {
              if (this.spamMessage[i].senderId != +this.messagesService.getUserId()) {
                this.isSpamMessage = false;
              }
              else {
                this.isSpamMessage = true;
              }
            }
          } else {
            this.isSpamMessage = false;
          }
        }
        if (!this.isSpamMessage) {
          this.ReplyMessage(threadId);
        } else {
          this.messageBody = "";
          this.Toster.error("Please Wait for the other party to reply first.");
        }
      });
  }
  ///Set group values Appearance,LisfeStyle and Location
  SetProfileGroupValues() {
    //set Appearance
    if (this.userProfile.height) {
      this.Appearance = this.userProfile.height + ' Height';
    }
    if (this.userProfile.physique) {
      if (this.Appearance.length > 0)//has value
      {
        this.Appearance += ', ' + this.userProfile.physique + ' Physique';
      }
      else {
        this.Appearance = this.userProfile.physique + ' Physique';
      }
    }
    if (this.userProfile.eye) {
      if (this.Appearance.length > 0)//has value
      {
        this.Appearance += ', ' + this.userProfile.eye + ' Eyes';
      }
      else {
        this.Appearance = this.userProfile.eye + ' Eyes';
      }
    }
    if (this.userProfile.hair) {
      if (this.Appearance.length > 0)//has value
      {
        this.Appearance += ', ' + this.userProfile.hair + ' Hair';
      }
      else {
        this.Appearance = this.userProfile.hair + ' Hair';
      }
    }
    //Set LifeStyle
    if (this.userProfile.diet) {
      this.Lifestyle = this.userProfile.diet + ' Diet';
    }
    if (this.userProfile.drink) {
      if (this.Lifestyle.length > 0)//has value
      {
        this.Lifestyle += ', ' + this.userProfile.drink + ' Drink';
      }
      else {
        this.Lifestyle = this.userProfile.drink + ' Drink';
      }
    }
    if (this.userProfile.smoke) {
      if (this.Lifestyle.length > 0)//has value
      {
        this.Lifestyle += ', ' + this.userProfile.smoke + ' Smoke';
      }
      else {
        this.Lifestyle = this.userProfile.smoke + ' Smoke';
      }
    }
    if (this.userProfile.exercise) {
      if (this.Lifestyle.length > 0)//has value
      {
        this.Lifestyle += ', ' + this.userProfile.exercise + ' Exercise';
      }
      else {
        this.Lifestyle = this.userProfile.exercise + ' Exercise';
      }
    }
    //Set Location
    if (this.userProfile.city) {
      this.Location = this.userProfile.city;
    }
    if (this.userProfile.zipcode) {
      if (this.Location.length > 0)//has value
      {
        this.Location += ', ' + this.userProfile.zipcode.toString();
      }
      else {
        this.Location = this.userProfile.zipcode.toString();
      }
    }
    if (this.userProfile.state) {
      if (this.Location.length > 0)//has value
      {
        this.Location += ', ' + this.userProfile.state;
      }
      else {
        this.Location = this.userProfile.state;
      }
    }
    if (this.userProfile.country) {
      if (this.Location.length > 0)//has value
      {
        this.Location += ', ' + this.userProfile.country;
      }
      else {
        this.Location = this.userProfile.country;
      }
    }
  }
  SetProfileSeekingGroupValues() {
    //set Appearance
    if (this.profileSeeking) {
      if (this.profileSeeking.height) {
        this.SeekingAppearance = this.profileSeeking.height + ' Height';
      }
      if (this.profileSeeking.physique) {
        if (this.SeekingAppearance.length > 0)//has value
        {
          this.SeekingAppearance += ', ' + this.profileSeeking.physique + ' Physique';
        }
        else {
          this.SeekingAppearance = this.profileSeeking.physique + ' Physique';
        }
      }
      if (this.profileSeeking.eyes) {
        if (this.SeekingAppearance.length > 0)//has value
        {
          this.SeekingAppearance += ', ' + this.profileSeeking.eyes + ' Eyes';
        }
        else {
          this.SeekingAppearance = this.profileSeeking.eyes + ' Eyes';
        }
      }
      if (this.profileSeeking.hair) {
        if (this.SeekingAppearance.length > 0)//has value
        {
          this.SeekingAppearance += ', ' + this.profileSeeking.hair + ' Hair';
        }
        else {
          this.SeekingAppearance = this.profileSeeking.hair + ' Hair';
        }
      }
      //Set SeekingLifeStyle
      if (this.profileSeeking.diet) {
        this.SeekingLifeStyle = this.profileSeeking.diet + ' Diet';
      }
      if (this.profileSeeking.drink) {
        if (this.SeekingLifeStyle.length > 0)//has value
        {
          this.SeekingLifeStyle += ', ' + this.profileSeeking.drink + ' Drink';
        }
        else {
          this.SeekingLifeStyle = this.profileSeeking.drink + ' Drink';
        }
      }
      if (this.profileSeeking.smoke) {
        if (this.SeekingLifeStyle.length > 0)//has value
        {
          this.SeekingLifeStyle += ', ' + this.profileSeeking.smoke + ' Smoke';
        }
        else {
          this.SeekingLifeStyle = this.profileSeeking.smoke + ' Smoke';
        }
      }
      if (this.profileSeeking.exercise) {
        if (this.SeekingLifeStyle.length > 0)//has value
        {
          this.SeekingLifeStyle += ', ' + this.profileSeeking.exercise + ' Exercise';
        }
        else {
          this.SeekingLifeStyle = this.profileSeeking.exercise + ' Exercise';
        }
      }
    }
  }
  //#region UploadPhotos
  //#region  Compress/Save Image
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
  SaveProfileImages(imgType: string, action: string, showToaster?: boolean) {
    switch (action) {
      case 'save':
        switch (imgType) {
          case 'poster':
            this.isPosterImageSaveClicked = true;
            this.isProfileImageSaveClicked = false;
            this.updatedProfileImages.User_Id = + this.profileService.getUserId();
            this.updatedProfileImages.imageExtention = "." + this.fileExtension;
            this.userProfile.canvasImageUrl.length > 1
              ? this.updatedProfileImages.CanvasImageUrl = this.userProfile.canvasImageUrl.replace("~", "")
              : this.updatedProfileImages.CanvasImageUrl = this.userProfile.canvasImageUrl;
            this.updatedProfileImages.imageBase64 = this.resizedImage.replace("data:image/png;base64,", "");
            //save image in its folder on the server.
            this.UpdateProfileSubscription = this.profileService.UpdateProfilePosterImage(this.updatedProfileImages)
              .subscribe((result: any) => {
                if (result) {
                  if (this.imageChangedEvent) {
                    this.imageChangedEvent = null;
                    this.isPosterImageEdit = false;
                    this.uploadingPosterPhoto = false;
                  }
                  this.getUserProfile();
                  this.isPosterImageSaveClicked = false;
                  this.newPosterImageLoaded = false;
                  if (showToaster) {
                    this.Toster.success("Poster Image Saved Successfuly");
                  }
                }
              }, () => {
                this.Toster.error("Save failed");
              });
            break;
          case 'profile':
            this.isProfileImageSaveClicked = true;
            this.isPosterImageSaveClicked = false;
            this.updatedProfileImages.User_Id = + this.profileService.getUserId();
            this.userProfile.passportImageUrl.length > 1
              ? this.updatedProfileImages.PassportImageUrl = this.userProfile.passportImageUrl.replace("~", "")
              : this.updatedProfileImages.PassportImageUrl = this.userProfile.passportImageUrl;
            this.updatedProfileImages.imageExtention = "." + this.profileImageFileExtension;
            this.updatedProfileImages.imageBase64 = this.resizedImage.replace("data:image/png;base64,", "");
            //save image in its folder on the server.
            this.UpdateProfileSubscription = this.profileService.UpdateProfilePassportImage(this.updatedProfileImages)
              .subscribe((result: any) => {
                if (result) {
                  if (this.profileImageChangeEvent) {
                    this.profileImageChangeEvent = null;
                    this.isProfileImageEdit = false;
                    this.uploadingProfilePhoto = false;
                    this.newProfileImageLoaded = false;
                  }
                  this.getUserProfile(true);
                  this.isProfileImageSaveClicked = false;
                  if (showToaster) {
                    this.Toster.success("Profile Image Saved Successfuly");
                  }
                }
              }, () => {
                this.Toster.error("Save failed");
              });
            break;
        }
        break;
      case 'cancel':
        switch (imgType) {
          case 'poster':
            this.imageChangedEvent = null;
            this.croppedImage = "";
            this.isPosterImageEdit = false;
            this.newPosterImageLoaded = false;
            break;
          case 'profile':
            this.profileImageChangeEvent = null;
            this.profileCroppedImage = "";
            this.isProfileImageEdit = false;
            this.newProfileImageLoaded = false;
            break;
        }
        break;
      case 'remove':
        switch (imgType) {
          case 'poster':
            this.isPosterImageRemoveClicked = true;
            this.updatedProfileImages.User_Id = + this.profileService.getUserId();
            this.updatedProfileImages.imageBase64 = '';
            this.userProfile.canvasImageUrl.length > 1
              ? this.updatedProfileImages.CanvasImageUrl = this.userProfile.canvasImageUrl.replace("~", "")
              : this.updatedProfileImages.CanvasImageUrl = this.userProfile.canvasImageUrl;
            this.UpdateProfileSubscription = this.profileService.UpdateProfilePosterImage(this.updatedProfileImages)
              .subscribe((result: any) => {
                if (result) {
                  this.isPosterImageRemoveClicked = false;
                  this.isPosterImageEdit = false;
                  this.newPosterImageLoaded = false;
                  this.getUserProfile();
                  this.Toster.success("Removed Successfuly");
                }
              }, () => {
                this.Toster.error("Remove failed");
              });
            break;
          case 'profile':
            this.isProfileImageRemoveClicked = true;
            this.updatedProfileImages.User_Id = + this.profileService.getUserId();
            this.updatedProfileImages.imageBase64 = '';
            this.userProfile.passportImageUrl.length > 1
              ? this.updatedProfileImages.PassportImageUrl = this.userProfile.passportImageUrl.replace("~", "")
              : this.updatedProfileImages.PassportImageUrl = this.userProfile.passportImageUrl;
            this.UpdateProfileSubscription = this.profileService.UpdateProfilePassportImage(this.updatedProfileImages)
              .subscribe((result: any) => {
                if (result) {
                  this.isProfileImageRemoveClicked = false;
                  this.isProfileImageEdit = false;
                  this.newProfileImageLoaded = false;
                  this.getUserProfile(true);
                  this.Toster.success("Removed Successfuly");
                }
              }, () => {
                this.Toster.error("Remove failed");
              });
            break;
        }
        break;
    }
  }
  SaveProfilePhotos(action: string, photo?: appProfilePhoto) {
    switch (action) {
      case 'save':
        console.log("the current loaded image >> " + this.resizedImage);
        if (this.resizedImage !== "" && this.resizedImage !== undefined) {
          this.isProfilePhotoSaveClicked = true;
          this.profilePhotoObject.profileId = +this.profileService.getProfileId();
          this.profilePhotoObject.imageName = this.imageName;
          this.profilePhotoObject.imageDescription = " ";
          this.profilePhotoObject.imageAlt = this.profileService.getSname() + "_" + this.profilePhotoObject.imageName;
          this.profilePhotoObject.imageExtention = "." + this.profilePhotoFileExtension;
          this.profilePhotoObject.imageUrl = "";
          this.profilePhotoObject.imageBase64 = this.resizedImage.replace("data:image/png;base64,", "");
          this.UpdateProfileSubscription = this.profileService.AddProfilePhoto(this.profilePhotoObject)
            .subscribe((result: any) => {
              if (result) {
                this.isProfilePhotoSaveClicked = false;
                this.isProfilePhotoEdit = false;
                this.isAddingPhotos = false;
                this.ProfilePhotoCroppedImage = "";
                this.imageName = "";
                this.imageDescription = "";
                this.resizedImage = "";
                this.ProfilePhotoChangedEvent = null;
                this.GetProfilePhotosList();
                this.uploadingAlbumPhotos = false;
                console.log("Photo Saved Successfuly");
              }
            }, () => {
              console.log("Photo Save failed");
            });
        }
        break;
      case 'cancel':
        this.isProfilePhotoEdit = false;
        this.ProfilePhotoCroppedImage = "";
        this.ProfilePhotoChangedEvent = null;
        this.isAddingPhotos = false;
        break;
      case 'remove':
        photo.imageUrl = photo.imageUrl.replace("~", "");
        this.UpdateProfileSubscription = this.profileService.DeleteProfilePhoto(photo)
          .subscribe((result: any) => {
            if (result) {
              this.GetProfilePhotosList();
              this.Toster.success("Removed Successfuly");
            }
          }, () => {
            this.Toster.error("Remove failed");
          });
        break;
    }
  }
  //#endregion
  //#region Profile Image
  profileChangeEvent(event: any): void {
    //clear the cropped image instance.
    this.profileCroppedImage = "";
    this.newProfileImageLoaded = true;
    if (event.target.files[0].size > 1310720) {//more than 1 mb.
      this.profileImageChangeEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images larger than 1MB.";
      return;
    } else {//size is ok.
      this.profileImageChangeEvent = event;
      var type = event.target.files[0].type;
      this.profileImageFileExtension = type.split('/')[1];
      this.isLoadingImageError = false;
      this.loadingimageError = "";
      this.uploadingProfilePhoto = true;
    }
  }
  ProfileImageCropped(event: ImageCroppedEvent) {
    console.log("profile image width>> " + event.width);
    console.log("profile image height>> " + event.height);
    if (event.width < 150 && event.height < 150) {
      this.profileImageChangeEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images less than 150px width and 150px height.";
      return;
    }
    else {
      this.profileCroppedImage = event.base64;
      this.compressImage(this.profileCroppedImage);
      this.isLoadingImageError = false;
      this.loadingimageError = "";
    }
  }
  ProfileimageLoaded() {
    /* show cropper */
    console.log("croper loaded");
  }
  ProfilecropperReady() {
    /* cropper ready */
    console.log("croper ready");
  }
  ProfileloadImageFailed() {
    /* show message */
  }
  //#endregion
  //#region  Poster Imabe
  fileChangeEvent(event: any): void {
    //clear the cropped image instance.
    this.croppedImage = "";
    this.newPosterImageLoaded = true;
    if (event.target.files[0].size > 1048576) {//more than 1 mb.1310720
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
      this.uploadingPosterPhoto = true;
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
      this.croppedImage = event.base64;
      this.compressImage(this.croppedImage);
      this.isLoadingImageError = false;
      this.loadingimageError = "";
    }
  }
  imageLoaded(event) {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }
  //#endregion
  //#region Photo Image
  GetProfilePhotosList() {
    this.PhotosList.length = 0;
    this.UpdateProfileSubscription = this.profileService.GetProfilePhotosList(this.userProfile.id)
      .subscribe((result: any) => {
        if (result) {
          this.profilePhotosList = result;
          for (var i = 0; i < this.profilePhotosList.length; i++) {
            this.PhotosList.push({
              image: this.profileService.bindImageUrl('', this.profilePhotosList[i].imageUrl)
              , thumbImage: this.profileService.bindImageUrl('', this.profilePhotosList[i].imageUrl)
              , alt: this.profilePhotosList[i].imageAlt
              , title: this.profilePhotosList[i].imageName
            });
            console.log("thumnail>>" + this.PhotosList[i].thumbImage);
          }
          this.PhotosList.length > 0
            ? this.completionCompletePercent += 10
            : this.completionCompletePercent = this.completionCompletePercent;
          console.log("PhotosList  >> " + this.PhotosList.length);
        }
      });
  }
  AddPhoto() {
    this.CheckCreditsSubscription = this.profileService.GetProfilePhotosCredit(this.profileService.getProfileId())
      .subscribe((result: any) => {
        if (result) {
          this.CheckLimits();
          console.log("Photo credit count >> " + result.length);
          console.log("Photo Limit count >> " + this.LifeTimeLimit);
          if (result.length < this.LifeTimeLimit) {
            this.isProfilePhotoEdit = true;
            this.isAddingPhotos = true;
          }
          else {
            this.isProfilePhotoEdit = false;
            this.isAddingPhotos = false;
            this.Toster.error("Limits Alert: You usesd all your credits.");
          }
        }
      });
    return false;
  }
  profilePhotoChangeEvent(event: any): void {
    //clear the cropped image instance.
    this.ProfilePhotoCroppedImage = "";
    console.log("the file" + event.target.files[0])
    if (event.target.files[0].size > 1310720) {//more than 1 mb.
      this.ProfilePhotoChangedEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images larger than 1MB.";
      return;
    } else {//size is ok.
      this.ProfilePhotoChangedEvent = event;
      var type = event.target.files[0].type;
      this.profilePhotoFileExtension = type.split('/')[1];
      this.isLoadingImageError = false;
      this.loadingimageError = "";
      this.uploadingAlbumPhotos = true;
    }
  }
  ProfilePhotoImageCropped(event: ImageCroppedEvent) {
    console.log("profile image width>> " + event.width);
    console.log("profile image height>> " + event.height);
    if (event.width < 250 && event.height < 250) {
      this.ProfilePhotoChangedEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images less than 250px width and 250px height.";
      return;
    }
    else if (event.width > 2400 && event.height > 1200) {
      this.ProfilePhotoChangedEvent = null;
      this.isLoadingImageError = true;
      this.loadingimageError = "You can't upload images more than 2400px width and 1200px height.";
      return;
    }
    else {
      this.ProfilePhotoCroppedImage = event.base64;
      this.compressImage(this.ProfilePhotoCroppedImage);
      this.isLoadingImageError = false;
      this.loadingimageError = "";
    }
  }
  ProfilePhotoimageLoaded() {
    /* show cropper */
    console.log("croper loaded");
  }
  ProfilePhotoCropperReady() {
    /* cropper ready */
    console.log("croper ready");
  }
  ProfilePhotoloadImageFailed() {
    /* show message */
  }
  //#endregion
  //#endregion
  //#endregion 
  //#region ProfileLike Functions
  SetProfileLikedFavedObject() {
    //reset the sent object
    this.ProfileLikedFavedSentObject = { profileUserId: 0, userId: 0, isLiked: 0 };
    //set the sent object
    this.ProfileLikedFavedSentObject.profileUserId = this.userProfile.id;
    if (this.authService.isLoggedIn()) {
      this.ProfileLikedFavedSentObject.userId = +this.localStorage.getItem('ProfileId');
    }
    return this.ProfileLikedFavedSentObject;
  }
  async CheckLikesFavs(favOrLike: string) {
    //reset the returned object
    this.ProfileLikedFavedReturnedObject = {} as appProfileFavLike;
    switch (favOrLike) {
      case 'like':
        this.IsLikesSubscription = (await this.IsLikedService.create(this.SetProfileLikedFavedObject()))
          .subscribe((data: any) => {
            if (data) {
              this.ProfileLikedFavedReturnedObject = data[0];
              if (this.ProfileLikedFavedReturnedObject) {
                if (this.ProfileLikedFavedReturnedObject.isLiked) {
                  this.liked = true;
                }
                else {
                  this.liked = false;
                }
              }
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'fav':
        this.IsFavsSubscription = (await this.IsFavedService.create(this.SetProfileLikedFavedObject()))
          .subscribe((data: any) => {
            if (data) {
              this.ProfileLikedFavedReturnedObject = data[0];
              if (this.ProfileLikedFavedReturnedObject) {
                if (this.ProfileLikedFavedReturnedObject.isLiked) {
                  this.faved = true;
                }
                else {
                  this.faved = false;
                }
              }
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
    }
  }
  async BindLikesFavs(favOrLike: string) {
    //reset the LikesFavs List
    this.LikesFavsList.length = 0;
    switch (favOrLike) {
      case 'like':
        this.LikesSubscription = (await this.ProfilesLikedMeService.GetProfileLikesCount(this.userProfile.id))
          .subscribe((result: any) => {
            if (result) {
              this.LikesFavsList = result;
              this.LikesCount = this.LikesFavsList.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
      case 'fav':
        this.FavsSubscription = (await this.ProfilesFavMeService.GetProfileFavoritesCount(this.userProfile.id))
          .subscribe((result: any) => {
            if (result) {
              this.LikesFavsList = result;
              this.FavsCount = this.LikesFavsList.length;
            }
          }, (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          });
        break;
    }
  }
  async ProfileLikeFav(favOrLike: string) {
    switch (favOrLike) {
      case 'like':
        this.CheckCreditsSubscription = (await this.profileService.GetProfileLikesCredit(this.profileService.getProfileId()))
          .subscribe((result: any) => {
            if (result) {
              this.CheckLimits();
              console.log("Likes credit count>> " + result.length);
              console.log("Likes Limits count>> " + this.DailyLimit);
              if (result.length < this.DailyLimit) {
                this.liked = !this.liked;
                if (this.liked) {
                  this.ProfileLikedFavedSentObject.isLiked = 1;
                }
                else {
                  this.ProfileLikedFavedSentObject.isLiked = 0;
                }
                this.LikeUnLikeFavUnFav = this.IsLikedService.LikeUnLike(this.ProfileLikedFavedSentObject)
                  .subscribe(result => {
                    console.log('Success');
                    this.BindLikesFavs(favOrLike);
                  }, (error) => {
                    this.errorHandler.handleError(error);
                    this.errorMessage = this.errorHandler.errorMessage;
                  });
              } else {
                this.Toster.error("You usesd all your credits.");
                return false;
              }
            }
          });
        break;
      case 'fav':
        this.CheckCreditsSubscription = (await this.profileService.GetProfileFavouritsCredit(this.profileService.getProfileId()))
          .subscribe((result: any) => {
            if (result) {
              this.CheckLimits();
              console.log("Favs Daily Count>> " + result.length);
              console.log("Likes Limits count>> " + this.DailyLimit);
              if (result.length < this.DailyLimit) {
                this.faved = !this.faved;
                if (this.faved) {
                  this.ProfileLikedFavedSentObject.isLiked = 1;
                }
                else {
                  this.ProfileLikedFavedSentObject.isLiked = 0;
                }
                this.LikeUnLikeFavUnFav = this.IsFavedService.FavUnFav(this.ProfileLikedFavedSentObject)
                  .subscribe(result => {
                    console.log('Success');
                    this.BindLikesFavs(favOrLike);
                  }, (error) => {
                    this.errorHandler.handleError(error);
                    this.errorMessage = this.errorHandler.errorMessage;
                  });
              }
              else {
                this.Toster.error("You usesd all your credits.");
                return false;
              }
            }
          });
        break;
    }
  }
  //#endregion
}
