import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from './tags-resources-parent.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShortRelationShipService extends TagsResourcesParentService {
  constructor(http:HttpClient) {
    super(http,'assets/xmls/Short-Relationship.xml');
  }
}
