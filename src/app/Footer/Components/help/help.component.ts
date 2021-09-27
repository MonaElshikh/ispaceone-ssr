import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { HelpService } from '../../Services/help.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  HelpData: any = [];
  HelpSubscription: Subscription;
  isExpand = [];
  DataLoading = true;
  constructor(
    private meta: MetaTagslService,
    private HelpS: HelpService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindHelp();
  }

  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Help | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about user help" }
    ];
    this.meta.SetPageTitle("Help | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindHelp() {
    this.HelpSubscription = this.HelpS.getList()
      .subscribe((data) => {
        this.HelpS.parseFooterXml(data)
          .then((data) => {
            this.HelpData = data;
            this.DataLoading = false;
          })
      }, (err) => {
        throw err;
      });
  }
}
