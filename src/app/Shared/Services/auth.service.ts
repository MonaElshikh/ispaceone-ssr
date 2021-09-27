import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {
  jwt: JwtHelperService;
  constructor(http: HttpClient, private _http: HttpClient, localStorage: LocalstorageService) {
    super(http, environment.BASE_URL + "/Login", localStorage);
  }
  async GetUserByEmail(user: any) {
    return await this._http.post(environment.BASE_URL + "/GetUserByEmail", user);
  }
}
