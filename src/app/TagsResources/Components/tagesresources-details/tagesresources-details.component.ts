import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { LoveRomanceService } from 'TagsResources/Services/love-romance.service';
import { TagsResourcesParentService } from 'TagsResources/Services/tags-resources-parent.service';

import { environment } from '../../../../environments/environment';
import { appTagsResources } from '../../models/tags-resources';
import { LoveRomanceComponent } from '../love-romance/love-romance.component';

@Component({
  selector: 'app-tagesresources-details',
  templateUrl: './tagesresources-details.component.html',
  styleUrls: ['./tagesresources-details.component.css']
})
export class TagesresourcesDetailsComponent implements OnInit, OnDestroy {
  @Input() TagsResourcesObject: appTagsResources = {} as appTagsResources;
  @Input() header: string = "";
  @Input() url = "";
  @Input() menuUrl = "";
  @Input() randomImageUrl = "";
  @Input() articlesList: any = [];
  @Input() readThisList: any = [];
  @Input() arrayLength: number;
  CurrentUrl: string = "";
  CurrentDesc: string = "";
  id; title;
  articles: any = [];
  metaTags: MetaDefinition[] = [];
  showComments: boolean = false;
  nextSubscribtion: Subscription;
  previousSubscribtion: Subscription;
  navigateSubscribtion: Subscription;
  parameterSubscription: Subscription;
  descriptionSubscription: Subscription;
  PageTitle = "";
  Description: string = "";
  constructor(
    private route: Router
    , private activeRoute: ActivatedRoute
    , private tagsresourceS: LoveRomanceService
    , private meta: MetaTagslService
  ) {
  }
  ngOnInit(): void {
    this.SetMetaTags();
  }
  ngOnDestroy() {
    this.route.onSameUrlNavigation = "ignore";
    if (this.navigateSubscribtion) this.navigateSubscribtion.unsubscribe();
    if (this.nextSubscribtion) this.nextSubscribtion.unsubscribe();
    if (this.previousSubscribtion) this.previousSubscribtion.unsubscribe();
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
    if (this.descriptionSubscription) this.descriptionSubscription.unsubscribe();
  }
  SetMetaTags() {
    console.log("meta from details");
    let cat = this.url.replace("/", "").replace("/", "");
    this.randomImageUrl = this.tagsresourceS.getRandomImage(cat);
    this.parameterSubscription = this.activeRoute.params
      .subscribe(params => {
        this.PageTitle = params['title'].split('-').join(' ') + " | ispace1";
      });
    this.metaTags = [
      { name: "title", content: this.PageTitle },
      { name: "description", content: this.TagsResourcesObject && this.TagsResourcesObject !== undefined ? this.TagsResourcesObject.description : "" },
      { name: "metaImage", content: environment.HostUrl + "/" + this.randomImageUrl }
    ];
    this.meta.SetPageTitle(this.PageTitle);
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  navigate(TagsResourcesObj: appTagsResources, action: string) {
    this.id = parseInt(TagsResourcesObj.id);
    switch (action) {
      case 'next':
        this.id === this.arrayLength - 1 ? this.id = 0 : this.id += 1;
        break;
      case 'prev':
        this.id === 0 ? this.id = this.arrayLength - 1 : this.id -= 1;
        break;
    }
    this.navigateSubscribtion = this.tagsresourceS.getList()
      .subscribe((data) => {
        this.tagsresourceS.parseXML(data)
          .then((data) => {
            this.articles = data;
            this.title = this.articles[this.id].title;
            this.route.navigate([this.url + this.title.split(' ').join('-')]);
            this.SetMetaTags();
          });
      }, (error: AppErrorHandler) => {
        throw error;
      });
  }
  openArticle(article: appTagsResources) {
    this.route.navigate([this.url, article.title.split(' ').join('-')]);
    this.SetMetaTags();
  }
}
