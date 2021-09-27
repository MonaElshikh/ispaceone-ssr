import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserAgreementService } from '../../Services/user-agreement.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-useragreement',
  templateUrl: './useragreement.component.html',
  styleUrls: ['./useragreement.component.css']
})
export class UseragreementComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  UserAgreementData: any = [];
  DataLoading = true;
  UserAggrementSubscription: Subscription;
  constructor(
    private meta: MetaTagslService,
    private UserAgreementS: UserAgreementService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BinduserAgreement();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "User Agreement | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about user agreement" }
    ];
    this.meta.SetPageTitle("User Agreement | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BinduserAgreement() {
    this.UserAggrementSubscription = this.UserAgreementS.getList()
      .subscribe((data) => {
        this.UserAgreementS.parseFooterXml(data)
          .then((data) => {
            this.UserAgreementData = data;
            this.DataLoading = false;
            console.log("UserAgreementData .title>> " + this.UserAgreementData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
