import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService extends DataService {
  constructor(http: HttpClient, private _http: HttpClient, localStorage: LocalstorageService) {
    super(http, environment.BASE_URL + "/Profile", localStorage);
  }
  profileList: any[] = [];
  fillProfileList() {
    if (this.profileList.length == 0) {
      this.profileList.push({
        profileId: 1, profileName: 'Raja', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '30', gender: 'Male', country: 'USA'
      });
      this.profileList.push({
        profileId: 2, profileName: 'Avani', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '30', gender: 'Female', country: 'USA'
      });
      this.profileList.push({
        profileId: 3, profileName: 'Ahmed', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '30', gender: 'Male', country: 'Canada'
      });
      this.profileList.push({
        profileId: 4, profileName: 'Cicilia', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '39', gender: 'Female', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 5, profileName: 'moez', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '10', gender: 'Male', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 6, profileName: 'mohamed', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '48', gender: 'Male', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 7, profileName: 'seema', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '30', gender: 'Female', country: 'USA'
      });
      this.profileList.push({
        profileId: 8, profileName: 'ali', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '8', gender: 'Male', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 9, profileName: 'Animaa', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '10', gender: 'Female', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 10, profileName: 'Makiss', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '20', gender: 'Female', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 11, profileName: 'mazen', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '7', gender: 'Male', country: 'Egypt'
      });
      this.profileList.push({
        profileId: 12, profileName: 'Marwa', profileImage: '/assets/images/love-romance/love-romance.jpg', posterImage: '/assets/images/love-romance/love-romance.jpg'
        , profileHeadLine: 'hello there, looking forward to connecting with you hello hello hello hello hello hello hello hello', age: '43', gender: 'Female', country: 'Egypt'
      });
    }
    return this.profileList;
  }
  RegisterUser(register: any) {
    return this._http.post(environment.BASE_URL + "/Registers", register);
  }
  CreateProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/CreateProfileUser", userProfile);
  }
  UpdateProfileStatusAfterRegister(id: any) {
    return this._http.get(environment.BASE_URL + "/Registers/" + id);
  }
  async GetProfileByUname(userProfile: any) {
    return await this._http.post(environment.BASE_URL + "/GetProfileByUname", userProfile);
  }
  updateProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfile", userProfile);
  }
  UpdateProfilePosterImage(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfilePosterImage", userProfile);
  }
  UpdateProfilePassportImage(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfilePassportImage", userProfile);
  }
  GetBlockedProfilesList(id) {
    return this._http.get(environment.BASE_URL + "/ProfileBlock/" + id);
  }
  UnlockProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UnblockProfile", userProfile);
  }
  UpdateProfileFullName(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfileFullName", userProfile);
  }
 
  UpdateProfileDob(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfileDob", userProfile);
  }
  CloseAccount(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/CloseProfileAccount", userProfile);
  }
  UpdatePw(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdatePassword", userProfile);
  }
  UpdateEmail(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateProfileEmail", userProfile);
  }
  GetProfilePhotosList(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfilePhotos/" + id);
  }
  AddProfilePhoto(photo: any) {
    return this._http.post(environment.BASE_URL + "/ProfilePhotos", photo);
  }
  DeleteProfilePhoto(photo: any) {
    return this._http.post(environment.BASE_URL + "/DeleteProfilePhotos", photo);
  }
  CheckBlockedProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/CheckBlockedProfile", userProfile);
  }
  BlockProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/ProfileBlock", userProfile);
  }
  ReportProfile(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/ProfileReport", userProfile);
  }
  GetProfileList(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/GetProfileList", userProfile);
  }
  GetProfileLikesCredit(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileLikesCredit/" + id);
  }
  GetProfileFavouritsCredit(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileFavouritsCredit/" + id);
  }
  GetProfilePhotosCredit(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfilePhotosCredit/" + id);
  }
  GetProfileBlockCredit(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileBlockCredit/" + id);
  }
  GetProfileReportCredit(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileReportCredit/" + id);
  }
  GetProfileMutualLikes(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileMutualLikes/" + id);
  }
  GetProfileMutualFavourites(id: any) {
    return this._http.get(environment.BASE_URL + "/ProfileMutualFavourites/" + id);
  }
  UpdateLastloginDate(id: any) {
    return this._http.get(environment.BASE_URL + "/UpdateLastLoginStatus/" + id);
  }
  AddProfileSeeking(profileSeeking: any) {
    return this._http.post(environment.BASE_URL + "/UserSeekings", profileSeeking);
  }
  GetProfileSeeking(id: any) {
    return this._http.get(environment.BASE_URL + "/UserSeekings/" + id);
  }
  GetRelatedProfiles(id: number) {
    return this._http.get(environment.BASE_URL + "/RelatedProfiles/" + id);
  }
   UpdateVisibilitySettings(userProfile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateVisibilitySettings", userProfile);
  }
  UpdateNotificationSettings(profile: any) {
    return this._http.post(environment.BASE_URL + "/UpdateNotificationSettings", profile);
  }
  DeleteUnActivatedAccount(id) {
    return this._http.get(environment.BASE_URL + "/DeleteUnActivatedAccount/" + id);
  }
}
