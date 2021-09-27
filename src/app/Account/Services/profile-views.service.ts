import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileViewsService  extends DataService {
  constructor(http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + "/ProfileViews",localStorage);
  }
}
