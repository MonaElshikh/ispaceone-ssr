import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PrivacyPolicyService } from '../../Services/privacy-policy.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  PrivacyData: any = [];
  DataLoading = true;
  PrivacySubscription: Subscription;
  constructor(private meta: MetaTagslService,
    private PrivacyS: PrivacyPolicyService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindPrivacy();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Privacy Policy | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about privacy policy" }
    ];
    this.meta.SetPageTitle("Privacy Policy | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindPrivacy() {
    this.PrivacySubscription = this.PrivacyS.getList()
      .subscribe((data) => {
        this.PrivacyS.parseFooterXml(data)
          .then((data) => {
            this.PrivacyData = data;
            this.DataLoading = false;
            console.log("PrivacyData .title>> " + this.PrivacyData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
