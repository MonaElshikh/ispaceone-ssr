import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CookieUseService } from '../../Services/cookie-use.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-cookieuse',
  templateUrl: './cookieuse.component.html',
  styleUrls: ['./cookieuse.component.css']
})
export class CookieuseComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  CookieData: any = [];
  DataLoading = true;
  CookieSubscription: Subscription;
  constructor(private meta: MetaTagslService, private CookieUseS: CookieUseService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindCookieUse();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Cookie Use | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about cookie use" }
    ];
    this.meta.SetPageTitle("Cookie Use | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindCookieUse() {
    this.CookieSubscription = this.CookieUseS.getList()
      .subscribe((data) => {
        this.CookieUseS.parseFooterXml(data)
          .then((data) => {
            this.CookieData = data;
            this.DataLoading = false;
            console.log("CookieData .title>> " + this.CookieData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
