import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { appProfile } from '../../models/profile';
import{ProfessionList} from '../../../Shared/models/general-lists';
import { ProfileService } from '../../Services/profile-service.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  //#region DECLARATIONS
  ProfileId = 0;
  viewMode: string;
  KeyWord: string = "";
  ProfileType: string = "";
  Gender: string = "";
  MaritalProfStatus: string = "";
  ChildrenProfStatus: string = "";
  Sexuality: string = "";
  AgeGroup: string = "";
  FromAge: string = "";
  ToAge: string = "";
  Religion: string = "";
  Ethencity: string = "";
  Political: string = "";
  Slanguages: string = "";
  EducationLevel: string = "";
  Profesional: string = "";
  ActivityLevel: string = "";
  ProfStatus: string = "";
  mode: string = "";
  IsShowPhotosOnly = false;
  interacted: string = "";
  ProfilesCount: number = 0;
  isGalleryView = true;
  isListView = false;
  IsProfileForbidden = false;
  isKeywordsCollapse = true;
  isProfileTypeCollapse = true;
  isGenderCollapse = true;
  isMaritalStatusCollapse = true;
  isChildrenCollapse = true;
  isSexualityCollapse = true;
  isAgeGroupCollapse = true;
  isReligionCollapse = true;
  isEthencityCollapse = true;
  isPoliticalCollapse = true;
  isSlanguagesCollapse = true;
  isEducationLevelCollapse = true;
  isProfessionCollapse = true;
  isActivityLevelCollapse = true;
  isProfStatusCollapse = true;
  isPhotofilterCollapse = true;
  isInteractedCollapse = true;
  DataLoading = true;
  profileList: appProfile[] = [];
  pageOfItems: Array<any> = [];
  AgeGroupList: any = [];
  userProfile: appProfile = {} as appProfile;
  metaTags: MetaDefinition[] = [];
  ProfessionList: string[] = ProfessionList;
  profileListSubscription: Subscription;
  placeHolderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  //#endregion
  //#region EVENTS
  constructor(
    public profileService: ProfileService
    , private router: Router
    , private route: ActivatedRoute
    , private spinner: NgxSpinnerService
    , private Toster: ToastrService
    , private meta: MetaTagslService
    , @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    this.GetProfileList();
    this.BingAgeGroup();
    this.SetMetaTags();
    this.ProfessionList.shift();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Profiles - Personal Profiles | ispace1" },
      { name: 'description', content: "Profiles - All Profiles" },
    ];
    this.meta.SetPageTitle("Profiles - Personal Profiles | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  ngOnDestroy() {
    if (this.profileListSubscription) this.profileListSubscription.unsubscribe();
  }
  //#endregion
  //#region FUNCTIONS
  //fun to set user location with format.
  SetUserLocation(profile: appProfile) {
    let location = "";
    let country = ""
    //Set user country appreviation
    country = this.profileService.getCountryAppriviation(profile.country);
    if (profile.city) {
      location = profile.city;
    }
    if (profile.state) {
      location.length > 0 ?
        location += ", " + profile.state :
        location = profile.state;
    }
    if (country) {
      location.length > 0 ?
        location += ", " + country :
        location = country;
    }
    return location;
  }
  toggle(boxName: string) {
    switch (boxName) {
      case "keywords":
        this.isKeywordsCollapse = !this.isKeywordsCollapse;
        break;
      case "profileType":
        this.isProfileTypeCollapse = !this.isProfileTypeCollapse;
        break;
      case "gender":
        this.isGenderCollapse = !this.isGenderCollapse;
        break;
      case "mstatus":
        this.isMaritalStatusCollapse = !this.isMaritalStatusCollapse;
        break;
      case "children":
        this.isChildrenCollapse = !this.isChildrenCollapse;
        break;
      case "sexuality":
        this.isSexualityCollapse = !this.isSexualityCollapse;
        break;
      case "agegroup":
        this.isAgeGroupCollapse = !this.isAgeGroupCollapse;
        break;
      case "religion":
        this.isReligionCollapse = !this.isReligionCollapse;
        break;
      case "ethencity":
        this.isEthencityCollapse = !this.isEthencityCollapse;
        break;
      case "political":
        this.isPoliticalCollapse = !this.isPoliticalCollapse;
        break;
      case "slang":
        this.isSlanguagesCollapse = !this.isSlanguagesCollapse;
        break;
      case "edulevel":
        this.isEducationLevelCollapse = !this.isEducationLevelCollapse;
        break;
      case "profession":
        this.isProfessionCollapse = !this.isProfessionCollapse;
        break;
      case "activitylevel":
        this.isActivityLevelCollapse = !this.isActivityLevelCollapse;
        break;
      case "profstatus":
        this.isProfStatusCollapse = !this.isProfStatusCollapse;
        break;
      case "photo":
        this.isPhotofilterCollapse = !this.isPhotofilterCollapse;
        break;
      case "interacted":
        this.isInteractedCollapse = !this.isInteractedCollapse;
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
  openProfile(uname: string) {
    console.log('/Profile/' + uname);
    this.router.navigate(['/Profile/', uname]);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  changeSelection(boxName: string, event) {
    console.log(event);
    console.log(event.target.value);
    console.log(event.target.checked);
    switch (boxName) {
      case "profileType":
        if (event.target.checked) {
          if (this.ProfileType.length === 0) {
            this.ProfileType = event.target.value;
          }
          else {
            this.ProfileType += "," + event.target.value;
          }
        }
        else {
          if (this.ProfileType.length >= 0) {
            this.ProfileType.indexOf(event.target.value) != -1 ? this.ProfileType = this.ProfileType.replace(event.target.value, "") : this.ProfileType = this.ProfileType;
            this.ProfileType = this.ProfileType.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.ProfileType.length === 1 && this.ProfileType.indexOf(",") != -1) {
            this.ProfileType = "";
          }
        }
        console.log("profileType>> " + this.ProfileType);
        console.log("ProfileType.length>> " + this.ProfileType.length);
        break;
      case "gender":
        if (event.target.checked) {
          if (this.Gender.length === 0) {
            this.Gender = event.target.value;
          }
          else {
            this.Gender += "," + event.target.value;
          }
        }
        else {
          if (this.Gender.length >= 0) {
            this.Gender.indexOf(event.target.value) != -1 ? this.Gender = this.Gender.replace(event.target.value, "") : this.Gender = this.Gender;
            this.Gender = this.Gender.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Gender.length === 1 && this.Gender.indexOf(",") != -1) {
            this.Gender = "";
          }
        }
        console.log("Gender>> " + this.Gender);
        console.log("Gender.length>> " + this.Gender.length);
        break;
      case "mstatus":
        if (event.target.checked) {
          if (this.MaritalProfStatus.length === 0) {
            this.MaritalProfStatus = event.target.value;
          }
          else {
            this.MaritalProfStatus += "," + event.target.value;
          }
        }
        else {
          if (this.MaritalProfStatus.length >= 0) {
            this.MaritalProfStatus.indexOf(event.target.value) != -1 ? this.MaritalProfStatus = this.MaritalProfStatus.replace(event.target.value, "") : this.MaritalProfStatus = this.MaritalProfStatus;
            this.MaritalProfStatus = this.MaritalProfStatus.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.MaritalProfStatus.length === 1 && this.MaritalProfStatus.indexOf(",") != -1) {
            this.MaritalProfStatus = "";
          }
        }
        console.log("MaritalProfStatus>> " + this.MaritalProfStatus);
        console.log("MaritalProfStatus.length>> " + this.MaritalProfStatus.length);
        break;
      case "children":
        if (event.target.checked) {
          if (this.ChildrenProfStatus.length === 0) {
            this.ChildrenProfStatus = event.target.value;
          }
          else {
            this.ChildrenProfStatus += "," + event.target.value;
          }
        }
        else {
          if (this.ChildrenProfStatus.length >= 0) {
            this.ChildrenProfStatus.indexOf(event.target.value) != -1 ? this.ChildrenProfStatus = this.ChildrenProfStatus.replace(event.target.value, "") : this.ChildrenProfStatus = this.ChildrenProfStatus;
            this.ChildrenProfStatus = this.ChildrenProfStatus.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.ChildrenProfStatus.length === 1 && this.ChildrenProfStatus.indexOf(",") != -1) {
            this.ChildrenProfStatus = "";
          }
        }
        console.log("ChildrenProfStatus>> " + this.ChildrenProfStatus);
        console.log("ChildrenProfStatus.length>> " + this.ChildrenProfStatus.length);
        break;
      case "sexuality":
        if (event.target.checked) {
          if (this.Sexuality.length === 0) {
            this.Sexuality = event.target.value;
          }
          else {
            this.Sexuality += "," + event.target.value;
          }
        }
        else {
          if (this.Sexuality.length >= 0) {
            this.Sexuality.indexOf(event.target.value) != -1 ? this.Sexuality = this.Sexuality.replace(event.target.value, "") : this.Sexuality = this.Sexuality;
            this.Sexuality = this.Sexuality.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Sexuality.length === 1 && this.Sexuality.indexOf(",") != -1) {
            this.Sexuality = "";
          }
        }
        console.log("Sexuality>> " + this.Sexuality);
        console.log("Sexuality.length>> " + this.Sexuality.length);
        break;
      case "religion":
        if (event.target.checked) {
          if (this.Religion.length === 0) {
            this.Religion = event.target.value;
          }
          else {
            this.Religion += "," + event.target.value;
          }
        }
        else {
          if (this.Religion.length >= 0) {
            this.Religion.indexOf(event.target.value) != -1 ? this.Religion = this.Religion.replace(event.target.value, "") : this.Religion = this.Religion;
            this.Religion = this.Religion.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Religion.length === 1 && this.Religion.indexOf(",") != -1) {
            this.Religion = "";
          }
        }
        console.log("Religion>> " + this.Religion);
        console.log("Religion.length>> " + this.Religion.length);
        break;
      case "ethencity":
        if (event.target.checked) {
          if (this.Ethencity.length === 0) {
            this.Ethencity = event.target.value;
          }
          else {
            this.Ethencity += "," + event.target.value;
          }
        }
        else {
          if (this.Ethencity.length >= 0) {
            this.Ethencity.indexOf(event.target.value) != -1 ? this.Ethencity = this.Ethencity.replace(event.target.value, "") : this.Ethencity = this.Ethencity;
            this.Ethencity = this.Ethencity.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Ethencity.length === 1 && this.Ethencity.indexOf(",") != -1) {
            this.Ethencity = "";
          }
        }
        console.log("Ethencity>> " + this.Ethencity);
        console.log("Ethencity.length>> " + this.Ethencity.length);
        break;
      case "political":
        if (event.target.checked) {
          if (this.Political.length === 0) {
            this.Political = event.target.value;
          }
          else {
            this.Political += "," + event.target.value;
          }
        }
        else {
          if (this.Political.length >= 0) {
            this.Political.indexOf(event.target.value) != -1 ? this.Political = this.Political.replace(event.target.value, "") : this.Political = this.Political;
            this.Political = this.Political.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Political.length === 1 && this.Political.indexOf(",") != -1) {
            this.Political = "";
          }
        }
        console.log("Political>> " + this.Political);
        console.log("Political.length>> " + this.Political.length);
        break;
      case "slang":
        if (event.target.checked) {
          if (this.Slanguages.length === 0) {
            this.Slanguages = event.target.value;
          }
          else {
            this.Slanguages += "," + event.target.value;
          }
        }
        else {
          if (this.Slanguages.length >= 0) {
            this.Slanguages.indexOf(event.target.value) != -1 ? this.Slanguages = this.Slanguages.replace(event.target.value, "") : this.Slanguages = this.Slanguages;
            this.Slanguages = this.Slanguages.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Slanguages.length === 1 && this.Slanguages.indexOf(",") != -1) {
            this.Slanguages = "";
          }
        }
        console.log("Slanguages>> " + this.Slanguages);
        console.log("Slanguages.length>> " + this.Slanguages.length);
        break;
      case "edulevel":
        if (event.target.checked) {
          if (this.EducationLevel.length === 0) {
            this.EducationLevel = event.target.value;
          }
          else {
            this.EducationLevel += "," + event.target.value;
          }
        }
        else {
          if (this.EducationLevel.length >= 0) {
            this.EducationLevel.indexOf(event.target.value) != -1 ? this.EducationLevel = this.EducationLevel.replace(event.target.value, "") : this.EducationLevel = this.EducationLevel;
            this.EducationLevel = this.EducationLevel.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.EducationLevel.length === 1 && this.EducationLevel.indexOf(",") != -1) {
            this.EducationLevel = "";
          }
        }
        console.log("EducationLevel>> " + this.EducationLevel);
        console.log("EducationLevel.length>> " + this.EducationLevel.length);
        break;
      case "profession":
        if (event.target.checked) {
          if (this.Profesional.length === 0) {
            this.Profesional = event.target.value;
          }
          else {
            this.Profesional += "," + event.target.value;
          }
        }
        else {
          if (this.Profesional.length >= 0) {
            this.Profesional.indexOf(event.target.value) != -1 ? this.Profesional = this.Profesional.replace(event.target.value, "") : this.Profesional = this.Profesional;
            this.Profesional = this.Profesional.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.Profesional.length === 1 && this.Profesional.indexOf(",") != -1) {
            this.Profesional = "";
          }
        }
        console.log("Profesional>> " + this.Profesional);
        console.log("Profesional.length>> " + this.Profesional.length);
        break;
      case "activitylevel":
        if (event.target.checked) {
          if (this.ActivityLevel.length === 0) {
            this.ActivityLevel = event.target.value;
          }
          else {
            this.ActivityLevel += "," + event.target.value;
          }
        }
        else {
          if (this.ActivityLevel.length >= 0) {
            this.ActivityLevel.indexOf(event.target.value) != -1 ? this.ActivityLevel = this.ActivityLevel.replace(event.target.value, "") : this.ActivityLevel = this.ActivityLevel;
            this.ActivityLevel = this.ActivityLevel.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.ActivityLevel.length === 1 && this.ActivityLevel.indexOf(",") != -1) {
            this.ActivityLevel = "";
          }
        }
        console.log("ActivityLevel>> " + this.ActivityLevel);
        console.log("ActivityLevel.length>> " + this.ActivityLevel.length);
        break;
      case "profstatus":
        if (event.target.checked) {
          if (this.ProfStatus.length === 0) {
            this.ProfStatus = event.target.value;
          }
          else {
            this.ProfStatus += "," + event.target.value;
          }
        }
        else {
          if (this.ProfStatus.length >= 0) {
            this.ProfStatus.indexOf(event.target.value) != -1 ? this.ProfStatus = this.ProfStatus.replace(event.target.value, "") : this.ProfStatus = this.ProfStatus;
            this.ProfStatus = this.ProfStatus.replace(" ,", ",").replace(", ", ",")
              .replace(",,", ",").replace(" ,,", ",").replace(",, ", ",");
          }
          if (this.ProfStatus.length === 1 && this.ProfStatus.indexOf(",") != -1) {
            this.ProfStatus = "";
          }
        }
        console.log("ProfStatus>> " + this.ProfStatus);
        console.log("ProfStatus.length>> " + this.ProfStatus.length);
        break;
      case "photo":
        event.target.value === "photos" ? this.IsShowPhotosOnly = true : this.IsShowPhotosOnly = false;
        console.log("IsShowPhotosOnly>> " + this.IsShowPhotosOnly);
        break;
      case "interacted":
        this.interacted = event.target.value;
        console.log("interacted filter>>" + this.interacted + " from event >> " + event.target.value);
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
  BingAgeGroup() {
    this.AgeGroupList.length > 0 ? this.AgeGroupList.length = 0 : this.AgeGroupList = this.AgeGroupList;
    for (var i = 18; i < 100; i++) {
      this.AgeGroupList.push(i);
    }
    console.log("Age group>> " + this.AgeGroupList);
  }
  GetProfileList() {
    let forbidden = this.route.snapshot.queryParams["forbidden"];
    if (forbidden) {
      forbidden === "fb" ? this.Toster.error("You can not see This profile.", "Forbidden") : "";
    }
    var SearchCriteria = this.FillSearchCriteria();
    this.profileListSubscription = this.profileService.GetProfileList(SearchCriteria)
      .subscribe((result: any) => {
        if (result) {
          this.profileList = result;
          this.ProfilesCount = this.profileList.length;
          this.DataLoading = false;
        }
      });
  }
  FillSearchCriteria() {
    if (this.profileService.getProfileId()) {
      this.ProfileId = +this.profileService.getProfileId();
    }
    this.userProfile.id = this.ProfileId;
    this.mode != "" ? this.userProfile.mode = this.mode : this.userProfile.mode = "recent";
    this.KeyWord != "" ? this.userProfile.searchKeyWord = this.KeyWord : this.userProfile.searchKeyWord = null;
    this.FromAge != "" && this.ToAge != "" ? this.AgeGroup = this.FromAge + "-" + this.ToAge : this.AgeGroup = null;
    this.ProfileType != "" ? this.userProfile.profileType = this.ProfileType : this.userProfile.profileType = null;
    this.Gender != "" ? this.userProfile.gender = this.Gender : this.userProfile.gender = null;
    this.userProfile.country = null;
    this.MaritalProfStatus != "" ? this.userProfile.mar_status = this.MaritalProfStatus : this.userProfile.mar_status = null;
    this.ChildrenProfStatus != "" ? this.userProfile.childStatus = this.ChildrenProfStatus : this.userProfile.childStatus = null;
    this.Sexuality != "" ? this.userProfile.sexuality = this.Sexuality : this.userProfile.sexuality = null;
    this.Religion != "" ? this.userProfile.religion = this.Religion : this.userProfile.religion = null;
    this.Ethencity != "" ? this.userProfile.ethnicity = this.Ethencity : this.userProfile.ethnicity = null;
    this.Slanguages != "" ? this.userProfile.slang == this.Slanguages : this.userProfile.slang = null;
    this.EducationLevel != "" ? this.userProfile.highestEducation = this.EducationLevel : this.userProfile.highestEducation = null;
    this.Profesional != "" ? this.userProfile.profesional = this.Profesional : this.userProfile.profesional = null;
    this.ProfStatus != "" ? this.userProfile.profStatus = this.ProfStatus : this.userProfile.profStatus = null;
    this.ActivityLevel != "" ? this.userProfile.activitylevel = this.ActivityLevel : this.userProfile.activitylevel = null;
    this.AgeGroup != "" ? this.userProfile.AgeGroup = this.AgeGroup : this.userProfile.AgeGroup = null;
    this.interacted != "" ? this.userProfile.relationShip = this.interacted : this.userProfile.relationShip = null;
    this.IsShowPhotosOnly != null ? this.userProfile.isShowPhotosOnly = this.IsShowPhotosOnly : this.userProfile.isShowPhotosOnly = null;
    return this.userProfile;
  }
  SearchProfiles() {
    this.GetProfileList();
  }
  SortProfilesList(event) {
    this.mode = event.target.value;
    console.log("mode>> " + this.mode);
    this.GetProfileList();
  }
  //#endregion
}
