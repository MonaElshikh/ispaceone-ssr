import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesListService extends DataService {
  constructor(http: HttpClient,private _http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + '/ArticlesList',localStorage);
  }
 async GetArticlesByCategoryId(id:any){
    return await this._http.get(environment.BASE_URL + '/GetArticlesByCategoryId/' +id);
  }
}
