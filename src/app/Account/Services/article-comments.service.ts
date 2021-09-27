import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleCommentsService extends DataService {
  constructor(http: HttpClient, private _http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + '/ArticleComment',localStorage);
  }
  GetAllArticleComments(id:any){
    return this._http.get(environment.BASE_URL + '/GetArticleComments'+ '/' + id)
  }
  AddArticleComment(Comment:any){
    return this._http.post(environment.BASE_URL + '/AddArticleComment', Comment);
  }
  UpdateArticleComments(comment:any) {
    return this._http.post(environment.BASE_URL + '/UpdateArticleComment', comment);
  }
  DeleteArticleComments(comment:any) {
    return this._http.post(environment.BASE_URL + '/DeleteArticleComment' , comment);
  }
  CheckArticleCommentLike(comment:any){
    return this._http.post(environment.BASE_URL + '/IsArticleCommentLiked' , comment);
  }
  ArticleCommentLikeDisLike(comment:any){
    return this._http.post(environment.BASE_URL + '/UpdateArticleCommentLike' , comment);
  }
}
