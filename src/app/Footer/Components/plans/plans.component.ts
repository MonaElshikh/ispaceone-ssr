import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PlansService } from '../../Services/plans.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  PlansData: any = [];
  DataLoading = true;
  PlansSubscription: Subscription;
  constructor(
    private meta: MetaTagslService,
    private PlansS: PlansService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindPlans();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Plans | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about plans" }
    ];
    this.meta.SetPageTitle("Plans | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindPlans() {
    this.PlansSubscription = this.PlansS.getList()
      .subscribe((data) => {
        this.PlansS.parseFooterXml(data)
          .then((data) => {
            this.PlansData = data;
            this.DataLoading = false;
            console.log("PlansData .title>> " + this.PlansData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
