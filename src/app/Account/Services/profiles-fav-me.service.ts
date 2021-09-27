import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ProfilesFavMeService extends DataService {
  constructor(http: HttpClient,private _http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + "/ProfileFavorites",localStorage);
  }
 async GetProfileFavoritesCount(id: any) {
    return await this._http.get(environment.BASE_URL + "/ProfileFavoritesCount/" + id);
  }
}
