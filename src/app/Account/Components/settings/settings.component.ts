import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ArticleDescriptionService } from 'Account/Services/article-description.service';
import { MessagesService } from 'Account/Services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { appEmail } from 'Shared/models/email';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { AuthService } from 'Shared/Services/auth.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import { appLoginHistory } from '../../models/loginHistory';
import { appCheckUniqueUserNameEmail, appProfile, appProfileBlock } from '../../models/profile';
import { GetProfileByUnameService } from '../../Services/get-profile-by-uname.service';
import { ProfileService } from '../../Services/profile-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  //#region Declarations
  userProfile: appProfile = {} as appProfile;
  unblockedObject: appProfileBlock = {} as appProfileBlock;
  limits: appLimits = {} as appLimits;
  upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  loginHistoryList: appLoginHistory[] = [];
  blockedProfilesList: appProfileBlock[] = [];
  metaTags: MetaDefinition[] = [];
  Email: appEmail = {} as appEmail;
  fDob: NgForm;
  dateOfBirth: Date;
  closeAccountObject = { id: 0, User_Id: 0 };
  UpdatedPwObject = { Password: '', UserId: '' };
  UpdateEmail = { EmailId: '', User_Id: 0 };
  UpdatedDob = { Id: 0, Dob: null, IsShowAgeOnly: true };
  articleLikeFavCommentObject = { Uname: "" };
  currentUser = { uName: "" };
  updateMailCode = "";
  NewEmail = "";
  confirmNewEmail = "";
  fullName = "";
  pwError = "";
  oldPw = "";
  CurrentStatus = "";
  newPw;
  confirmNewPw;
  profileImage = "";
  ProfileStatus = "";
  HTML = "";
  VerficationCode = "";
  currentMailStatus = "Vervied";
  EmailVervicationCode = ""
  PromotionalEmailSetting = 1;
  StatsEmailSettings = 1;
  DailyLimits = 0;
  MonthlyLimits = 0;
  LiftimeLimits = 0;
  messageCredits = 0;
  photosCredits = 0;
  likesCredits = 0;
  favsCredits = 0;
  blockCredits = 0;
  reportCredits = 0;
  articleCredits = 0;
  articleLikesCredits = 0;
  articleTracks = 0;
  articleCommentsCredits = 0;
  articleCommentLikesCredits = 0;
  IsShowAgeOnly = false;
  IsShowAgeDob = false;
  VervicationCodeSent = false;
  emailVervied = true;
  IsViewAnonymous = false;
  IsRecAutoMailsToNewMessagesRequest = false;
  IsRecAutoMailsToPostingActivity = false;
  isUnblocking = false;
  isUpdateFullName = false;
  enableSubmitPw = false;
  rigthOldPw = true;
  rigtConfirmPw = true;
  rightNewPw = true;
  isUpdatePw = false;
  isUpdateEmail = false;
  isUpdatingDob = false;
  takenEmail = false;
  isUpdateVisibility = false;
  isUpdateNotification = false;
  rightConfirmEmail = true;
  enableSubmitEmail = false;
  isUpdateEmailClicked = false;
  isVisibilitySettingsCollapse = true;
  isLimitsBoxCollapse = true;
  isNotificationSettingsCollapse = true;
  isFullNameSettingsCollapse = true;
  isChangePwSettingsCollapse = true;
  isUpdateEmailSettingsCollapse = true;
  isDateOfBirthSettingsCollapse = true;
  isBlockedProfilesSettingsCollapse = true;
  isLoginHistorySettingsCollapse = true;
  isCloseAccountSettingsCollapse = true;
  isClosingAccount = false;
  ShowCloseAccountPanel = false;
  ShowLimitsBox = false;
  CheckCreditsSubscription: Subscription;
  LimitsSubscription: Subscription;
  UpgradeSubscription: Subscription;
  profileBlockSubscription: Subscription;
  profileVisibilitySubscription: Subscription;
  profileNotificationSubscription: Subscription;
  monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  yearsList = ['1900', '1901', '1902', '1903', '1904', '1905', '1906', '1907', '1908', '1909', '1910', '1911',
    '1912', '1913', '1914', '1915', '1916', '1917', '1918', '1919', '1920', '1921', '1922', '1923', '1924', '1925', '1926', '1927', '1928', '1929', '1930',
    '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939', '1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949',
    '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1960', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967',
    '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986',
    '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002'];
  //#endregion
  //#region Events
  constructor(
    public authService: AuthService
    , private ProfileService: ProfileService
    , private router: Router
    , private toster: ToastrService
    , private GetProfileByUnameService: GetProfileByUnameService
    , private localStorage: LocalstorageService
    , private meta: MetaTagslService
    , private LimitsAndUpgradeService: LimitsAndUpgradeService
    , private MessagesService: MessagesService
    , private ArticleDescriptionService: ArticleDescriptionService
  ) {
    this.getProfileImage();
  }
  ngOnInit(): void {
    this.GetAdminSettingsAndUpgrade();
    this.getUserProfile();
    this.BindProfileBlockList();
    this.SetMetaTags();
    this.loginHistoryList.push({
      Os: 'Window', Browser: 'Chrome', Device: 'DeskTop', Location: 'Egypt',
      IpAddress: '156.194.219.234',
      Date: '10-17-2020'
    });
    this.loginHistoryList.push({
      Os: 'Window', Browser: 'FireFox', Device: 'DeskTop', Location: 'Egypt',
      IpAddress: '156.194.219.234',
      Date: '10-17-2020'
    });
    this.loginHistoryList.push({
      Os: 'Window', Browser: 'Safari', Device: 'DeskTop', Location: 'Egypt',
      IpAddress: '156.194.219.234',
      Date: '10-17-2020'
    });
    this.loginHistoryList.push({
      Os: 'Window', Browser: 'IE', Device: 'DeskTop', Location: 'Egypt',
      IpAddress: '156.194.219.234',
      Date: '10-17-2020'
    });
  }
  ngOnDestroy() {
    if (this.profileBlockSubscription) this.profileBlockSubscription.unsubscribe();
    if (this.profileVisibilitySubscription) this.profileVisibilitySubscription.unsubscribe();
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
    if (this.CheckCreditsSubscription) this.CheckCreditsSubscription.unsubscribe();
    if (this.profileNotificationSubscription) this.profileNotificationSubscription.unsubscribe();
  }
  //#endregion
  //#region Functions
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Settings | ispace1" }
    ];
    this.meta.SetPageTitle("Settings | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  async GetAdminSettingsAndUpgrade() {
    this.LimitsSubscription = (await this.LimitsAndUpgradeService.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.limits = result[0];
          console.log("Limits From settings >>" + this.limits.personalPremiumRequestLimit);
        }
      });
    this.UpgradeSubscription = (await this.LimitsAndUpgradeService.getById(this.LimitsAndUpgradeService.getProfileId()))
      .subscribe((result: any) => {
        if (result) {
          this.upgrade = result[0];
          if (this.upgrade && this.upgrade !== undefined) {
            console.log("Upgrade From settings >>" + this.upgrade.upgradeTo);
          }
        }
      });
  }
  SetLimits() {
    //Set current user uName
    this.articleLikeFavCommentObject.Uname === ""
      ? this.articleLikeFavCommentObject.Uname = this.ProfileService.getUname()
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
  changeSelection(name: string, event) {
    switch (name) {
      case "profilestats":
        this.ProfileStatus = event.target.value;
        console.log("profilestats> " + this.ProfileStatus);
        break;
      case "profileanonymous":
        event.target.value === "Anonymous" ? this.IsViewAnonymous = true : this.IsViewAnonymous = false;
        break;
      case 'profileActivity':
        event.target.value === "yes" ? this.IsRecAutoMailsToNewMessagesRequest = true : this.IsRecAutoMailsToNewMessagesRequest = false;
        break;
      case 'postingsActivity':
        event.target.value === "yes" ? this.IsRecAutoMailsToPostingActivity = true : this.IsRecAutoMailsToPostingActivity = false;
        break;
      case 'promotionalEmail':
        this.PromotionalEmailSetting = event.target.value;
        break;
      case 'statsEmail':
        this.StatsEmailSettings = event.target.value;
        break;
    }
  }
  toggleSettingsBoxes(boxName) {
    switch (boxName) {
      case "limits":
        this.isLimitsBoxCollapse = !this.isLimitsBoxCollapse;
        this.SetLimits();
        this.isVisibilitySettingsCollapse = true;
        this.isNotificationSettingsCollapse = true;
        this.isFullNameSettingsCollapse = true;
        this.isChangePwSettingsCollapse = true;
        this.isUpdateEmailSettingsCollapse = true;
        this.isDateOfBirthSettingsCollapse = true;
        this.isBlockedProfilesSettingsCollapse = true;
        this.isLoginHistorySettingsCollapse = true;
        this.isCloseAccountSettingsCollapse = true;
        break;
      case 'VisibilitySettings':
        this.isVisibilitySettingsCollapse = !this.isVisibilitySettingsCollapse;
        this.isNotificationSettingsCollapse = true;
        this.isFullNameSettingsCollapse = true;
        this.isChangePwSettingsCollapse = true;
        this.isUpdateEmailSettingsCollapse = true;
        this.isDateOfBirthSettingsCollapse = true;
        this.isBlockedProfilesSettingsCollapse = true;
        this.isLoginHistorySettingsCollapse = true;
        this.isCloseAccountSettingsCollapse = true;
        break;
      case 'NotificationSettings':
        this.isNotificationSettingsCollapse = !this.isNotificationSettingsCollapse;
        this.isVisibilitySettingsCollapse = true;
        this.isFullNameSettingsCollapse = true;
        this.isChangePwSettingsCollapse = true;
        this.isUpdateEmailSettingsCollapse = true;
        this.isDateOfBirthSettingsCollapse = true;
        this.isBlockedProfilesSettingsCollapse = true;
        this.isLoginHistorySettingsCollapse = true;
        this.isCloseAccountSettingsCollapse = true;
        break;
      case 'FullNameSettings':
        this.isFullNameSettingsCollapse = !this.isFullNameSettingsCollapse;
        this.isVisibilitySettingsCollapse = true;
        this.isNotificationSettingsCollapse = true;
        this.isChangePwSettingsCollapse = true;
        this.isUpdateEmailSettingsCollapse = true;
        this.isDateOfBirthSettingsCollapse = true;
        this.isBlockedProfilesSettingsCollapse = true;
        this.isLoginHistorySettingsCollapse = true;
        this.isCloseAccountSettingsCollapse = true;
        break;
      case 'ChangePwSettings':
        this.isChangePwSettingsCollapse = !this.isChangePwSettingsCollapse;
        this.isVisibilitySettingsCollapse = true;
        this.isNotificationSettingsCollapse = true;
        this.isFullNameSettingsCollapse = true;
        this.isUpdateEmailSettingsCollapse = true;
        this.isDateOfBirthSettingsCollapse = true;
        this.isBlockedProfilesSettingsCollapse = true;
        this.isLoginHistorySettingsCollapse = true;
        this.isCloseAccountSettingsCollapse = true;
        break;
      case 'UpdateEmailSettings':
        this.isUpdateEmailSettingsCollapse = !this.isUpdateEmailSettingsCollapse;
        break;
      case 'DateOfBirthSettings':
        this.isDateOfBirthSettingsCollapse = !this.isDateOfBirthSettingsCollapse;
        break;
      case 'BlockedProfilesSettings':
        this.isBlockedProfilesSettingsCollapse = !this.isBlockedProfilesSettingsCollapse;
        break;
      case 'LoginHistorySettings':
        this.isLoginHistorySettingsCollapse = !this.isLoginHistorySettingsCollapse;
        break;
      case 'CloseAccountSetting':
        this.isCloseAccountSettingsCollapse = !this.isCloseAccountSettingsCollapse;
        break;
    }
  }
  UpdateVisibilitySettings() {
    const source = { id: this.userProfile.id, IsViewAnonymous: this.IsViewAnonymous, profile_status: this.ProfileStatus };
    this.profileVisibilitySubscription = this.ProfileService.UpdateVisibilitySettings(source)
      .subscribe(() => {
        this.toster.success("Successfuly updated your visibility settings.");
        this.isUpdateVisibility = false
        this.getUserProfile();
      }, () => {
        this.toster.error("Update failed.");
      });
  }
  UpdateNotificationSettings() {
    const source = {
      id: this.userProfile.id
      , IsRecAutoMailsToNewMessagesRequest: this.IsRecAutoMailsToNewMessagesRequest
      , IsRecAutoMailsToPostingActivity: this.IsRecAutoMailsToPostingActivity
      , PromotionalEmailSetting: this.PromotionalEmailSetting
      , StatsEmailSettings: this.StatsEmailSettings
    };
    this.profileVisibilitySubscription = this.ProfileService.UpdateNotificationSettings(source)
      .subscribe(() => {
        this.toster.success("Successfuly updated your notification settings.");
        this.isUpdateNotification = false
        this.getUserProfile();
      }, () => {
        this.toster.error("Update failed.");
      });
  }
  getProfileImage() {
    this.profileImage = this.localStorage.getItem("UserProfileImage");
  }
  BindProfileBlockList() {
    this.profileBlockSubscription = this.ProfileService.GetBlockedProfilesList(+this.ProfileService.getUserId())
      .subscribe((result: any) => {
        if (result) {
          this.blockedProfilesList = result;
          console.log("Success");
          console.log("Blcok list>> " + this.blockedProfilesList);
        }
      });
  }
  UnblockProfile() {
    this.isUnblocking = false;
    console.log("blockedProfile.sname>> " + this.unblockedObject.sname);
    console.log("blockedProfile.userId>> " + this.unblockedObject.userId);
    console.log("blockedProfile.abuse_profileId>> " + this.unblockedObject.abuseProfileId);
    this.profileBlockSubscription = this.ProfileService.UnlockProfile(this.unblockedObject)
      .subscribe(() => {
        console.log("Success");
        this.BindProfileBlockList();
      })
  }
  UpdateProfileFullName() {
    this.userProfile.fullName = this.fullName;
    this.profileBlockSubscription = this.ProfileService.UpdateProfileFullName(this.userProfile)
      .subscribe(() => {
        console.log("Success");
        this.getUserProfile();
        this.fullName = "";
        this.isUpdateFullName = false;
      });
  }
  ShowConfirmPanel(boxName, action, blockedprofile?: appProfileBlock) {
    switch (boxName) {
      case 'block':
        switch (action) {
          case 'show':
            this.isUnblocking = true;
            if (blockedprofile) {
              console.log("current blocked profile.sname>> " + blockedprofile.sname);
              console.log("current blocked profile.userId>> " + blockedprofile.userId);
              console.log("current blocked profile.abuse_profileId>> " + blockedprofile.abuseProfileId);
              this.unblockedObject = {} as appProfileBlock;
              this.unblockedObject.userId = blockedprofile.userId;
              this.unblockedObject.abuseProfileId = blockedprofile.abuseProfileId;
              this.unblockedObject.sname = blockedprofile.sname;
            }
            break;
          case 'cancel':
            this.isUnblocking = false;
            break;
        }
        break;
      case 'fullName':
        switch (action) {
          case 'show':
            this.isUpdateFullName = true;
            break;
          case 'cancel':
            this.isUpdateFullName = false;
            this.fullName = "";
            break;
        }
        break;
      case 'visibility':
        switch (action) {
          case 'show':
            this.isUpdateVisibility = true;
            break;
          case 'cancel':
            this.isUpdateVisibility = false;
            break;
        }
        break;
      case 'notifications':
        switch (action) {
          case 'show':
            this.isUpdateNotification = true;
            break;
          case 'cancel':
            this.isUpdateNotification = false;
            break;
        }
        break;
    }
  }
  async getUserProfile() {
    this.currentUser.uName = this.ProfileService.getUname();
    this.profileBlockSubscription = (await this.ProfileService.GetProfileByUname(this.currentUser))
      .subscribe((result: any) => {
        if (result) {
          this.userProfile = result;
          if (this.userProfile.isShowAgeOnly) {
            this.IsShowAgeOnly = true;
            this.IsShowAgeDob = false;
          } else {
            this.IsShowAgeOnly = false;
            this.IsShowAgeDob = true;
          }
          this.dateOfBirth = this.userProfile.dob;
          this.CurrentStatus = "Your profile is in good standing. Please make sure to compy with our general terms and condition so that your profile is always visibile to everyone.";
        }
      });
  }
  CloseAccount() {
    console.log("current user profile id > " + this.userProfile.id);
    console.log(" current user user id >  " + this.userProfile.userType);
    if (!this.isClosingAccount) {
      return;
    }
    this.closeAccountObject.id = this.userProfile.id;
    this.closeAccountObject.User_Id = this.userProfile.user_Id;
    this.profileBlockSubscription = this.ProfileService.CloseAccount(this.closeAccountObject)
      .subscribe(() => {
        console.log("success");
        this.authService.logout();
        this.router.navigate(['/']);
        this.isClosingAccount = false;
      })
  }
  CheckOldPw() {
    let oldPw = this.authService.GetUserPw();
    if (oldPw != this.oldPw) {
      this.rigthOldPw = false;
      this.pwError = "Password is not right.";
      return false;
    }
    else {
      this.rigthOldPw = true;
      this.pwError = "";
    }
  }
  CheckNewpw() {
    if (this.newPw.length < 6) {
      this.rightNewPw = false;
      this.pwError = "Password must be at least 6 characters.";
      return false;
    }
    else {
      this.rightNewPw = true;
      this.pwError = "";
    }
  }
  CheckUpdatedPw() {
    if (this.newPw === this.confirmNewPw) {
      this.rigtConfirmPw = true;
      this.enableSubmitPw = true;
    }
    else {
      this.rigtConfirmPw = false;
      this.enableSubmitPw = false;
      return false;
    }
  }
  UpdatePassword(action?) {
    if (action === 'cancel') {
      this.isUpdatePw = false;
      this.oldPw = "";
      this.newPw = "";
      this.confirmNewPw = "";
    }
    else {
      this.UpdatedPwObject.UserId = this.localStorage.getItem("UserId");
      this.UpdatedPwObject.Password = this.newPw;
      this.profileBlockSubscription = this.ProfileService.UpdatePw(this.UpdatedPwObject)
        .subscribe(() => {
          console.log("Success");
          this.isUpdatePw = false;
          this.oldPw = "";
          this.newPw = "";
          this.confirmNewPw = "";
          this.authService.logout();
          this.router.navigate(['/Login']);
        });
    }
  }
  CheckUpdatedEmail() {
    if (this.NewEmail === this.confirmNewEmail) {
      this.rightConfirmEmail = true;
      this.enableSubmitEmail = true;
    }
    else {
      this.rightConfirmEmail = false;
      this.enableSubmitEmail = false;
      return false;
    }
  }
  CheckUniqueEmail() {
    let resource = { Email: this.NewEmail };
    let data: appCheckUniqueUserNameEmail = {} as appCheckUniqueUserNameEmail;
    this.profileBlockSubscription = this.GetProfileByUnameService.CHeckUniqueEmail(resource)
      .subscribe((result: any) => {
        data = result;
        if (data.isValid > 0 || data.isValidR > 0) {
          this.rightConfirmEmail = false;
          this.enableSubmitEmail = false;
          this.takenEmail = true;
          return false;
        }
        else {
          this.rightConfirmEmail = true;
          this.enableSubmitEmail = true;
          this.takenEmail = false;
        }
      });
  }
  UpdateEmailAddress(action?,) {
    if (action === 'cancel') {
      this.isUpdateEmail = false;
      this.NewEmail = "";
      this.confirmNewEmail = "";
    }
    else {
      console.log("verfication code from update mail fun> " + this.VerficationCode);
      console.log("entered verfication code> " + this.EmailVervicationCode);
      if (this.EmailVervicationCode === this.VerficationCode) {
        this.UpdateEmail.User_Id = +this.ProfileService.getUserId();
        this.UpdateEmail.EmailId = this.NewEmail;
        this.profileBlockSubscription = this.ProfileService.UpdateEmail(this.UpdateEmail)
          .subscribe(() => {
            this.toster.success("Successfuly updated your email address.");
            this.enableSubmitEmail = false;
            this.NewEmail = "";
            this.confirmNewEmail = "";
            this.emailVervied = true;
            this.VervicationCodeSent = false;
            this.EmailVervicationCode = "";
            this.currentMailStatus = "Verfied";
          }, () => {
            this.toster.error("Update failed");
          });
      }
      else {
        this.toster.error("Wrong verfication code.");
        this.EmailVervicationCode = "";
        return false;
      }
    }
  }
  SendVervicationCodeForUpdateEmail() {
    this.isUpdateEmailClicked = true;
    var mail = this.SetEmailObject();
    this.authService.SendMail(mail)
      .subscribe(() => {
        this.toster.success("Please check your email", "Verfication code sent");
        this.VervicationCodeSent = true;
        this.emailVervied = false;
        this.isUpdateEmailClicked = false;
        this.isUpdateEmail = false;
        this.currentMailStatus = "Not verfied";
      });
  }
  SetEmailObject(): appEmail {
    this.VerficationCode = this.ProfileService.initateRandomText(8);
    console.log("verfication code from email fun > " + this.VerficationCode);
    this.HTML = "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12px;font-family: Verdana;color: #666666;\">We have received your request to update your primary email address with us.</td></tr>";
    this.HTML += "<tr><td colspan='2'  style=\"padding-top :5px;padding-left :5px;font-size: 12x;font-family: Verdana;color: #666666;\">You must verify this change, please enter this code in your settings page: " + this.VerficationCode + " </td></tr>";
    this.Email.Subject = "Update Email: please verify change in your email address";
    this.Email.FullName = this.userProfile.sname;
    this.Email.EmailAddress = this.userProfile.emailId;
    this.Email.Content = this.HTML;
    return this.Email;
  }
  SubmitDateOfBirth(DobF) {
    var Dob = this.dateOfBirth;
    var showAge = this.IsShowAgeOnly;
    this.UpdatedDob.Id = this.userProfile.id;
    if (DobF.value["DobRadio"]) {
      DobF.value["DobRadio"] === "1" ? this.UpdatedDob.IsShowAgeOnly = true : this.UpdatedDob.IsShowAgeOnly = false;
    } else {
      this.UpdatedDob.IsShowAgeOnly = showAge;
    }
    if (DobF.value["dobTxt"]) {
      this.UpdatedDob.Dob = new Date(DobF.value["dobTxt"]);
    }
    else {
      this.UpdatedDob.Dob = Dob;
    }
    this.profileBlockSubscription = this.ProfileService.UpdateProfileDob(this.UpdatedDob)
      .subscribe((result: any) => {
        if (result) {
          console.log("Date of birth updated success");
          this.isUpdatingDob = false;
          this.getUserProfile();
        }
      });
  }
  UpdateDob(action) {
    if (action === "cancel") {
      this.isUpdatingDob = false;
      this.getUserProfile();
    }
    else {
      this.isUpdatingDob = true;
      return false;
    }
  }
  //#endregion
}
