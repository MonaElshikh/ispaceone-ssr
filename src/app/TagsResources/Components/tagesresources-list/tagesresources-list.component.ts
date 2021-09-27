import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { LoveRomanceService } from 'TagsResources/Services/love-romance.service';

import { appTagsResources } from '../../models/tags-resources';

@Component({
  selector: 'app-tagesresources-list',
  templateUrl: './tagesresources-list.component.html',
  styleUrls: ['./tagesresources-list.component.css']
})
export class TagesresourcesListComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  @Input() articlesList: Array<appTagsResources> = [];
  @Input() url: string = '';
  @Input() header: string = '';
  @Input() lbl1: string = '';
  @Input() lbl2: string = '';
  @Input() DataLoading: boolean;
  images: string[] = [];
  placholderList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  PageTitle = "";
  pageOfItems: Array<appTagsResources> = [];
  constructor(
    private route: Router
    , private meta: MetaTagslService
    , private tagresoursS: LoveRomanceService
    , @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit(): void {
    this.SetMetaTags();
  }
  //set images array,meta tags and page title & meta tags
  SetMetaTags() {
    console.log("meta from list");
    let cat = this.url.replace("/", "").replace("/", "");
    this.images = this.tagresoursS.getImagesListsByCat(cat);
    this.PageTitle = cat.replace("-", " & ") + " – Articles, Blogs, Comments, Discussions, Postings | ispace1";
    this.metaTags = [
      { name: 'title', content: this.PageTitle },
      { name: 'description', content: "Articles, Blogs, Comments, Discussions, Postings related to " + cat.replace("-", " & ") },
      { name: 'metaImage', content: "http://ispaceone.com/" + this.tagresoursS.getRandomImage(cat) }
    ];
    this.meta.SetPageTitle(this.PageTitle);
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  openArticle(article: appTagsResources) {
    this.route.navigate([this.url, article.title.split(' ').join('-')]);
  }
  onChangePage(pageOfItems: Array<appTagsResources>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
