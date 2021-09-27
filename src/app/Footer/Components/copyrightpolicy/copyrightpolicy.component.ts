import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CopyRightService } from '../../Services/copy-right.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-copyrightpolicy',
  templateUrl: './copyrightpolicy.component.html',
  styleUrls: ['./copyrightpolicy.component.css']
})
export class CopyrightpolicyComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  CopyrightData: any = [];
  DataLoading = true;
  CopyRightSubscription: Subscription;
  constructor(private meta: MetaTagslService, private CopyRightS: CopyRightService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindCopyRight();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Copyright Policy | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about copyright policy" }
    ];
    this.meta.SetPageTitle("Copyright Policy | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindCopyRight() {
    this.CopyRightSubscription = this.CopyRightS.getList()
      .subscribe((data) => {
        this.CopyRightS.parseFooterXml(data)
          .then((data) => {
            this.CopyrightData = data;
            this.DataLoading = false;
            console.log("CareersData .title>> " + this.CopyrightData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
