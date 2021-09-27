import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class IsLikedService extends DataService {
  constructor(http:HttpClient,private _http: HttpClient,localStorage:LocalstorageService) {
    super(http,environment.BASE_URL +'/IsLiked',localStorage);
  }
  LikeUnLike(profileLikeUnLike){
    return this._http.post(environment.BASE_URL + '/ProfilelikeUnLike', profileLikeUnLike);
  }
  CheckIsLikedProfile(isLikedProfile){
    return this._http.post(environment.BASE_URL + '/IsLiked', isLikedProfile);
  }
}
