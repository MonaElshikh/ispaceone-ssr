import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleDescriptionService extends DataService {
  constructor(http: HttpClient, private _http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + '/ArticleDescription',localStorage);
  }
  AddArticle(article: any) {
    return this._http.post(environment.BASE_URL + '/AddArticle', article);
  }
  UpdateArticle(article: any) {
    return this._http.post(environment.BASE_URL + '/UpdateArticle', article);
  }
  DeleteArticle(article: any) {
    return this._http.post(environment.BASE_URL + '/DeleteArticle', article);
  }
  GetArticleLikesCount(articleId: any) {
    return this._http.get(environment.BASE_URL + '/ArticleLikes/' + articleId);
  }
  IsArticleLiked(articleLikeDisLike: any) {
    return this._http.post(environment.BASE_URL + '/ArticleLikes', articleLikeDisLike);
  }
  ArticleLike(articleLikeDisLike: any) {
    return this._http.post(environment.BASE_URL + '/InsertArticleLikes', articleLikeDisLike);
  }
  DeleteArticleLike(articleLikeDisLike: any) {
    return this._http.post(environment.BASE_URL + '/DeleteArticleLike', articleLikeDisLike);
  }
  GetArticleTracksCount(articleId: any) {
    return this._http.get(environment.BASE_URL + '/ArticleTracks/' + articleId);
  }
  IsArticleTracked(articleTracke: any) {
    return this._http.post(environment.BASE_URL + '/ArticleTracks', articleTracke);
  }
  ArticleTrack(articleTracke: any) {
    return this._http.post(environment.BASE_URL + '/InsertArticleTrack', articleTracke);
  }
  DeleteArticleTrack(articleTracke: any) {
    return this._http.post(environment.BASE_URL + '/DeleteArticleTrack', articleTracke);
  }
  UpdateArticlePosterImage(article: any) {
    return this._http.post(environment.BASE_URL + '/UpdateArticlePostImage', article);
  }
  UpdateArticleReporting(article: any) {
    return this._http.post(environment.BASE_URL + '/UpdateArticleReporting', article);
  }
  GetArticlesCredit(id: any) {
    return this._http.get(environment.BASE_URL + '/ArticlesCredit/' + id);
  }
  GetArticleAbuseCredit(id: any) {
    return this._http.get(environment.BASE_URL + '/ArticleAbuseCredit/' + id);
  }
  GetArticleReportCredit(id: any) {
    return this._http.get(environment.BASE_URL + '/ArticleAbuseCredit/' + id);
  }
  GetArticleLikeCredit(article: any) {
    return this._http.post(environment.BASE_URL + '/ArticleLikeCredit', article);
  }
  GetArticleTrackingCredit(id: any) {
    return this._http.get(environment.BASE_URL + '/ArticleTrackingCredit/' + id);
  }
  GetArticleCommentsCredit(comment: any) {
    return this._http.post(environment.BASE_URL + '/ArticleCommentsCredit', comment);
  }
  GetArticleLikeCommentsCredit(comment: any) {
    return this._http.post(environment.BASE_URL + '/ArticleLikeCommentsCredit', comment);
  }
  GetRelatedArticles(id: any) {
    return this._http.get(environment.BASE_URL + '/RelatedArticles/' + id);
  }
}
