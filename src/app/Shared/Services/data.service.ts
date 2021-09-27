import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { appError } from 'Shared/models/app-error-handler';
import { appActiveUpgrade, appLimits } from 'Shared/models/LimitsAndUpgrade';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Limit: number;
  public limits: appLimits = {} as appLimits;
  public upgrade: appActiveUpgrade = {} as appActiveUpgrade;
  randomCode: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  jwt: JwtHelperService;
  redirectUrl = "";
  constructor(private http: HttpClient, private url: string, private localStorage: LocalstorageService) {
  }
  async getAll() {
    return await this.http.get(this.url)
      .pipe(
        catchError((err: Response) => {
          console.log("error status>> " + err.status);
          return throwError(new appError(err));
        }));
  }
  async getById(id) {
    return await this.http.get(this.url + '/' + id)
      .pipe(
        catchError((err: Response) => {
          console.log("error status>> " + err.status);
          return throwError(new appError(err));
        }));
  }
  async create(resource) {
    return await this.http.post(this.url, resource)
      .pipe(
        catchError((err: Response) => {
          console.log("error status>> " + err.status);
          return throwError(new appError(err));
        }));
  }
  //Generate randome text to use in captha or any random value.
  initateRandomText(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += this.randomCode[Math.floor(Math.random() * this.randomCode.length)];
    return result;
  }
  SendMail(email: any) {
    return this.http.post(environment.BASE_URL + "/SendMail", email);
  }
  logout() {
    this.localStorage.clear();
  }
  isLoggedIn() {
    let helper = new JwtHelperService();
    let token = this.localStorage.getItem('token');
    if (!token)
      return false;
    let isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
  get currentUser() {
    let token = this.localStorage.getItem('token');
    if (!token) return null;
    this.jwt = new JwtHelperService().decodeToken(token);
    this.localStorage.setItem('Id', this.jwt['Id']);
    this.localStorage.setItem('ProfileId', this.jwt['ProfileId']);
    this.localStorage.setItem('UserId', this.jwt['UserId']);
    this.localStorage.setItem('Password', this.jwt['Password']);
    this.localStorage.setItem('EmailId', this.jwt['EmailId']);
    this.localStorage.setItem('Atype', this.jwt['Atype']);
    this.localStorage.setItem('Sname', this.jwt['Sname']);
    this.localStorage.setItem('ActiveStatus', this.jwt['ActiveInactive']);
    this.localStorage.setItem('profileStatusByAdmin', this.jwt['profileStatusByAdmin']);
    this.localStorage.setItem('SuspendStatus', this.jwt['SuspendStatus']);
    this.localStorage.setItem('UserProfileImage', this.jwt['PassportImageURL']);
    this.localStorage.setItem('PosterProfileImage', this.jwt['canvasImageUrl']);
    return this.jwt;
  }
  async GetUnreadMessagesCount(id) {
    return await this.http.get(environment.BASE_URL + '/GetUnreadMessagesCount/' + id);
  }
  public setUserProfileImageUrl() {
    return this.bindImageUrl('profile', this.localStorage.getItem("UserProfileImage"));
  }
  public getUname() {
    return this.localStorage.getItem("UserId");
  }
  public getSname() {
    return this.localStorage.getItem("Sname");
  }
  public getUserId() {
    return this.localStorage.getItem("Id");
  }
  public getProfileId() {
    return this.localStorage.getItem("ProfileId");
  }
  public getEmail(){
    return this.localStorage.getItem("EmailId");
  }
  bindImageUrl(type, url: string): string {
    let imgUrl: string;
    if (url) {
      imgUrl = environment.BASE_URL + url.replace("~", "");
    }
    else {
      switch (type) {
        case 'profile':
          imgUrl = environment.BASE_URL + '/' + 'ui_PassportLarge/defaultProfileImage.jpg';
          break;
        case 'posting':
          imgUrl = environment.BASE_URL + '/' + 'ui_PostingsLarge/ispace1-stripe.jpg';
          break;
      }
    }
    return imgUrl;
  }
  public CalculateAge(birthdate) {
    return moment().diff(birthdate, 'years');
  }
  public clearList(list: any[]) {
    if (list.length > 0) {
      list.length = 0;
    }
  }
  public GetUserPw() {
    return this.localStorage.getItem("Password");
  }
  public GetLimits(checkFor: string, limits: appLimits, upgrade: appActiveUpgrade): number {
    if ((limits && limits !== undefined) && (upgrade && upgrade !== undefined)) {
      console.log("limits and upgrade r not null or undifiend",upgrade.upgradeTo);
      if (upgrade.upgradeTo === "Premium" && upgrade.adminStatus === "Approved") {
        switch (checkFor) {
          case 'daily':
            this.Limit = limits.personalPremiumRequestLimit;
            console.log("personalPremiumRequestLimit >> " + this.Limit);
            break;
          case 'monthly':
            this.Limit = limits.personalPremiumArticleLimit;
            console.log("personalPremiumArticleLimit >> " + this.Limit);
            break;
          case 'lifetime':
            this.Limit = limits.premiumphotosNo;
            console.log("premiumphotosNo >> " + this.Limit);
            break;
        }
      }
      else if (upgrade.upgradeTo === "Featured" && upgrade.adminStatus === "Approved") {
        switch (checkFor) {
          case 'daily':
            this.Limit = limits.personalFeaturedRequestLimit;
            console.log("personalFeaturedRequestLimit >> " + this.Limit);
            break;
          case 'monthly':
            this.Limit = limits.personalFeaturedArticleLimit;
            console.log("personalFeaturedArticleLimit >> " + this.Limit);
            break;
          case 'lifetime':
            this.Limit = limits.featuredphotosNo;
            console.log("featuredphotosNo >> " + this.Limit);
            break;
        }
      }
      else {
        switch (checkFor) {
          case 'daily':
            this.Limit = limits.personalRegularRequestLimit;
            console.log("personalRegularRequestLimit >> " + this.Limit);
            break;
          case 'monthly':
            this.Limit = limits.personalRegularArticleLimit;
            console.log("personalRegularArticleLimit >> " + this.Limit);
            break;
          case 'lifetime':
            this.Limit = limits.regularalphotosNo;
            console.log("personalRegularRequestLimit >> " + this.Limit);
            break;
        }
      }
      console.log("Final Limit from GetLimits function >> " + this.Limit);
    }
    else {
      switch (checkFor) {
        case 'daily':
          this.Limit = limits.personalRegularRequestLimit;
          console.log("personalRegularRequestLimit >> " + this.Limit);
          break;
        case 'monthly':
          this.Limit = limits.personalRegularArticleLimit;
          console.log("personalRegularArticleLimit >> " + this.Limit);
          break;
        case 'lifetime':
          this.Limit = limits.regularalphotosNo;
          console.log("personalRegularRequestLimit >> " + this.Limit);
          break;
      }
    }
    return this.Limit;
  }
  public IsRejectedOrDeletedUser() {
    var adminStatus = this.localStorage.getItem("profileStatusByAdmin");
    var SuspendStatus = this.localStorage.getItem("SuspendStatus");
    if (adminStatus === "Approved" && SuspendStatus === "Undeleted") {
      console.log("adminStatus> " + adminStatus + " -- " + "SuspendStatus> " + SuspendStatus);
      return false;
    }
    else {
      console.log("adminStatus> " + adminStatus + " -- " + "SuspendStatus> " + SuspendStatus);
      return true;
    }
  }
  getCountryAppriviation(country: string): string {
    let name = country.substring(country.indexOf("-") + 1, country.length);
    console.log("country app> " + name);
    return name.trim();
  }
  GetMesgCount() {
    return +this.localStorage.getItem("MesgCount");
  }
  GetInterestsCount() {
    let LikesCount = +this.localStorage.getItem("LikesCount");
    let FavCount = +this.localStorage.getItem("FavCount");
    console.log("Int count> " + LikesCount + FavCount);
    return LikesCount + FavCount;
  }
}
