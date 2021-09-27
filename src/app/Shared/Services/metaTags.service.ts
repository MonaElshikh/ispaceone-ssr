import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class MetaTagslService {
  constructor(@Inject(DOCUMENT) private dom,
    private meta: Meta, private pageTitle: Title) {
  }
  SetPageTitle(title: string) {
    this.pageTitle.setTitle(title);
  }
  UpdateMetaTags(Tags: MetaDefinition[]) {
    for (var i = 0; i < Tags.length; i++) {
      this.meta.updateTag({ name: Tags[i].name, content: Tags[i].content });
    }
  }
  setCanonicalURL(url?: string) {
    const canURL = url == undefined ? this.dom.URL : url;
    var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element === null || element === undefined) {
      const link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canURL);
    }
  }
}