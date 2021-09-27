import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TagsResourcesParentService } from './tags-resources-parent.service';
@Injectable({
  providedIn: 'root'
})
export class DatingCourtshipService extends TagsResourcesParentService {
  constructor(http:HttpClient) {
    super(http,'assets/xmls/Dating-Courtship.xml');
  }
}
