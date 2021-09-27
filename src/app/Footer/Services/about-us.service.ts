import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from '../../TagsResources/Services/tags-resources-parent.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AboutUsService  extends TagsResourcesParentService {
  constructor(http:HttpClient) {
    super(http,'assets/xmls/About-Us.xml');
  }
}
