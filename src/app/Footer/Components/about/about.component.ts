import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AboutUsService } from '../../Services/about-us.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  metaTags: MetaDefinition[] = [];
  AboutusData: any = [];
  DataLoading = true;
  AboutUsSubscription: Subscription;
  constructor(
    private meta: MetaTagslService
    , private AboutUsS: AboutUsService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindAboutUs();
  }
  ngOnDestroy() {
    if (this.AboutUsSubscription) this.AboutUsSubscription.unsubscribe();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "About | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about ispace1" }
    ];
    this.meta.SetPageTitle("About | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindAboutUs() {
    this.AboutUsSubscription = this.AboutUsS.getList()
      .subscribe((data) => {
        this.AboutUsS.parseFooterXml(data)
          .then((data) => {
            this.AboutusData = data;
            this.DataLoading = false;
          })
      }, (err) => {
        throw err;
      });
  }
}
