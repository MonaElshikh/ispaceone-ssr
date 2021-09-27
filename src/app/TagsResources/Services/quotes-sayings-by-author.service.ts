import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from './tags-resources-parent.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesSayingsByAuthorService extends TagsResourcesParentService {
  constructor(http:HttpClient) {
    super(http,'assets/xmls/Quotes-Sayings-Author-Name.xml');
  }
}
