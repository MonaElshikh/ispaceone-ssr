import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { appProfileCustomFields } from '../models/profile';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileCustomFieldsService extends DataService {
  constructor(http:HttpClient,private _http:HttpClient,localStorage:LocalstorageService) {
    super(http,environment.BASE_URL +'/GetProfileCustomFields',localStorage);
  }
  UpdateCusromFields(customFields:appProfileCustomFields){
    return this._http.post(environment.BASE_URL +'/UpdateProfileCustomFields',customFields);
  }
}
