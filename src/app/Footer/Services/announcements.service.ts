import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from '../../TagsResources/Services/tags-resources-parent.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService extends TagsResourcesParentService {
  constructor(http:HttpClient) {
    super(http,'assets/xmls/Announcements.xml');
  }
}
