import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CareersService } from '../../../TagsResources/Services/careers.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  CareersData: any = [];
  CareersSubscription: Subscription;
  DataLoading = true;
  constructor(private meta: MetaTagslService,
    private CareersS: CareersService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindCareers();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Careers | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about career opportunities" }
    ];
    this.meta.SetPageTitle("Careers | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindCareers() {
    this.CareersSubscription = this.CareersS.getList()
      .subscribe((data) => {
        this.CareersS.parseFooterXml(data)
          .then((data) => {
            this.CareersData = data;
            this.DataLoading = false;
            console.log("CareersData .title>> " + this.CareersData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
