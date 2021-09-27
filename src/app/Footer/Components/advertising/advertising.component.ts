import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { MetaDefinition } from '@angular/platform-browser';
import { AdvertisingService } from '../../Services/advertising.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit, OnDestroy {
  metaTags: MetaDefinition[] = [];
  AdvertisingData: any = [];
  DataLoading = true;
  AdvertisingSubscription: Subscription;
  constructor(private meta: MetaTagslService,
    private AdvertisingS: AdvertisingService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindAdvertising();
  }
  ngOnDestroy() {
    if (this.AdvertisingSubscription) this.AdvertisingSubscription.unsubscribe();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Advertising | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about advertising solutions" }
    ];
    this.meta.SetPageTitle("Advertising | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindAdvertising() {
    this.AdvertisingSubscription = this.AdvertisingS.getList()
      .subscribe((data) => {
        this.AdvertisingS.parseFooterXml(data)
          .then((data) => {
            this.AdvertisingData = data;
            this.DataLoading = false;
            console.log("AdvertisingData .title>> " + this.AdvertisingData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
