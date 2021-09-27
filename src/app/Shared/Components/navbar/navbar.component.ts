import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appMessageThreads } from 'Account/models/messages';
import { ProfilesFavMeService } from 'Account/Services/profiles-fav-me.service';
import { ProfilesLikedMeService } from 'Account/Services/profiles-liked-me.service';
import { appActiveUpgrade } from 'Shared/models/LimitsAndUpgrade';
import { AuthService } from 'Shared/Services/auth.service';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

import { appProfile } from '../../../Account/models/profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userProfile: appProfile = {} as appProfile;
  UserId = "";
  UserName: string;
  errorMessage = "";
  profileStatus = "";
  isExpanded = false;
  homeOver = false;
  profilesOver = false;
  postingsOver = false;
  moreOver = false;
  profileOver = false;
  mesgOver = false;
  toolsOver = false;
  interestsOver = false;
  myPostingOver = false;
  profileId: any;
  UpgradeStatus = "";
  RequestStatus = "";
  UpgradeTo = "";
  UpgradeDuration = "";
  AccountType = "Personal | Basic";
  MesgsCount: appMessageThreads[] = [];
  UpgradeHistoryList: appActiveUpgrade = {} as appActiveUpgrade;
  constructor(private router: Router,
    public authService: AuthService,
    private LimitsAndUpgradeService: LimitsAndUpgradeService,
    private localStorage: LocalstorageService,
    private ProfilesLikedMeS: ProfilesLikedMeService,
    private ProfilesFavMeS: ProfilesFavMeService) { }
  ngOnInit() {
    console.log("From nav init");
    this.updateMessageCount();
  }
  goHome() {
    this.setUserId();
    this.router.navigate(['/Home/', this.UserId]);
  }
  goProfile() {
    this.setUserId();
    this.router.navigate(['/Profile/', this.UserId]);
  }
  goInbox() {
    this.setUserId();
    this.router.navigate(['/Messages/', this.UserId]);
  }
  setUserId() {
    if (localStorage.getItem('UserId')) {
      this.UserId = localStorage.getItem('UserId');
    }
  }
  SetUserName() {
    if (localStorage.getItem('Sname')) {
      this.UserName = localStorage.getItem('Sname');
    }
  }
  bindProfileddl() {
    console.log('clicked');
  }
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  BindAccountData() {
    if (localStorage.getItem("SuspendStatus") != "" && localStorage.getItem("SuspendStatus") === "Deleted") {
      this.profileStatus = localStorage.getItem("SuspendStatus");
    }
    else {
      this.profileStatus = localStorage.getItem("profileStatusByAdmin");
    }
    this.LimitsAndUpgradeService.GetUpgradeHistory(this.LimitsAndUpgradeService.getProfileId())
      .subscribe((result: any) => {
        if (result != null && result.length >= 1) {
          console.log("upgrade result length>> " + result.length);
          this.UpgradeHistoryList = result[result.length - 1];
          if (this.UpgradeHistoryList !== null) {
            this.UpgradeStatus = this.UpgradeHistoryList.adminStatus;
            this.UpgradeTo = this.UpgradeHistoryList.upgradeTo;
            this.RequestStatus = this.UpgradeHistoryList.requestStatus;
            this.UpgradeDuration = this.UpgradeHistoryList.upgradeType + " " + this.UpgradeHistoryList.period;
            this.BuildUpgradeInfo();
          }
        }
      });
  }
  BuildUpgradeInfo() {
    if (this.UpgradeTo === "Featured" && this.UpgradeStatus === "Approved") {
      if (this.RequestStatus.toLowerCase().indexOf("expired") != -1
        || this.RequestStatus.toLowerCase().indexOf("payment is not clear") != -1) {
        this.AccountType = "Personal";
      }
      else {
        this.AccountType = "Featured";
      }
    }
    else if (this.UpgradeTo === "Premium" && this.UpgradeStatus === "Approved") {
      if (this.RequestStatus.toLowerCase().indexOf("expired") != -1
        || this.RequestStatus.toLowerCase().indexOf("payment is not clear") != -1) {
        this.AccountType = "Personal | Basic";
      }
      else {
        this.AccountType = "Premium";
      }
    }
    else if ((this.UpgradeTo === "" || this.UpgradeTo === null) && (this.UpgradeStatus === "" || this.UpgradeStatus === null)) {
      this.AccountType = "Personal | Basic";
    }
    else {
      this.AccountType = "Personal | Basic";
    }
    this.localStorage.setItem("AccountType", this.AccountType);
  }
  //Update Mesg count
  async updateMessageCount() {
    let ThreadsCount = [];
    let MesgCount = 0;
    if (this.authService.isLoggedIn()) {
      (await this.authService.GetUnreadMessagesCount(this.authService.getProfileId()))
        .subscribe((result: any) => {
          if (result) {
            if (result.length > 0) {
              this.MesgsCount = result;
              for (let mesg of this.MesgsCount) {
                if (ThreadsCount.indexOf(mesg.threadId) === -1) {
                  ThreadsCount.push(mesg.threadId);
                }
              }
              MesgCount = ThreadsCount.length;
            }
            this.localStorage.setItem("MesgCount", MesgCount.toString());
            this.authService.GetMesgCount();
          }
        });
    }
  }
  //Update Int Count
  async UpdateIntCount() {
    if (this.authService.isLoggedIn()) {
      let LikesCount; let FavCount
      (await this.ProfilesLikedMeS.getById(this.authService.getProfileId()))
        .subscribe((result: any) => {
          if (result) {
            LikesCount = result.length;
            this.localStorage.setItem("LikesCount", LikesCount);
          }
        });
      (await this.ProfilesFavMeS.getById(this.authService.getProfileId()))
        .subscribe((result: any) => {
          if (result) {
            FavCount = result.length;
            this.localStorage.setItem("FavCount", FavCount);
          }
        });
      this.authService.GetInterestsCount();
    }
  }
}
