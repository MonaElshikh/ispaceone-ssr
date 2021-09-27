import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class MyArticlesListService extends DataService {
  constructor(http:HttpClient,localStorage:LocalstorageService) {
    super(http,environment.BASE_URL +'/GetMyArticles',localStorage);
  }
}
