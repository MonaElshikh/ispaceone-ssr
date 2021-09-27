import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class GetProfileByUnameService extends DataService {
  constructor(http: HttpClient,private _http:HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + "/GetProfileByUname",localStorage);
  }

  public CheckUniqueUsername(resource:any){
    return this._http.post(environment.BASE_URL + "/CheckUniqueUsername",resource);
  }
  public CHeckUniqueEmail(resource:any){
    return this._http.post(environment.BASE_URL + "/CheckUniqueEmail",resource);
  }
}
