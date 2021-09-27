import { Injectable } from '@angular/core';
import { appArticleDescription } from '../models/ArticleDescription';
import { appPostingCategories } from '../models/posting-categories';

@Injectable({
  providedIn: 'root'
})
export class PostingServiceService {
  article: appArticleDescription;
  postingCategoriesList:appPostingCategories[]=[];
  constructor() {
   
  }
  fillPostingsList() {
  }
  getArticle(id: number) {
   
  }
  fillPostingCategories():appPostingCategories[]{
    this.postingCategoriesList.push({categoryId:1 ,categoryName:'Love & Romance'});
    this.postingCategoriesList.push({categoryId:2 ,categoryName:'Friends & Acquaintances'});
    this.postingCategoriesList.push({categoryId:3 ,categoryName:'Dating & Courtship'});
    this.postingCategoriesList.push({categoryId:4 ,categoryName:'Hookups & Affairs'});
    this.postingCategoriesList.push({categoryId:5 ,categoryName:'Infidelity & Cheating'});
    this.postingCategoriesList.push({categoryId:6 ,categoryName:'Sex & Intimacy'});
    this.postingCategoriesList.push({categoryId:7 ,categoryName:'Heartbreaks & Breakups'});
    this.postingCategoriesList.push({categoryId:8 ,categoryName:'Marriage & Matrimony'});
    this.postingCategoriesList.push({categoryId:9 ,categoryName:'Relationship & Commitment'});
    this.postingCategoriesList.push({categoryId:10 ,categoryName:'Attraction & Crushes'});
    this.postingCategoriesList.push({categoryId:11 ,categoryName:'Singles & Unattached'});
    this.postingCategoriesList.push({categoryId:12 ,categoryName:'Flirting & Seducing'});
    this.postingCategoriesList.push({categoryId:13 ,categoryName:'Harmony & Compatibility'});
    this.postingCategoriesList.push({categoryId:14 ,categoryName:'Chemistry & Connection'});
    this.postingCategoriesList.push({categoryId:15 ,categoryName:'Spouses & Couples'});
    this.postingCategoriesList.push({categoryId:16 ,categoryName:'Gays & Lesbians'});
    this.postingCategoriesList.push({categoryId:17 ,categoryName:'Extra & Extra'});
    this.postingCategoriesList.push({categoryId:18 ,categoryName:'Entertainment'});
    this.postingCategoriesList.push({categoryId:19 ,categoryName:'Lifestyle'});
    this.postingCategoriesList.push({categoryId:20 ,categoryName:'Movies'});
    this.postingCategoriesList.push({categoryId:21 ,categoryName:'Music'});
    this.postingCategoriesList.push({categoryId:22 ,categoryName:'Others'});
    return this.postingCategoriesList;
  }
}
