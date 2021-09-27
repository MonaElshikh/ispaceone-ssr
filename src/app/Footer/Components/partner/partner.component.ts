import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partenersList: any = [];
  metaTags: MetaDefinition[] = [];
  DataLoading = true;
  constructor(private meta: MetaTagslService) { }
  ngOnInit(): void {
    this.partenersList = [{ name: 'Platinum Partners', image: 'assets/images/ez.jpg', link: 'https://www.ezmethods.com/' },
    { name: 'Silver Partners', image: 'assets/images/ez.jpg', link: 'https://www.ezmethods.com/' },
    { name: 'Bronze Partners', image: 'assets/images/ez.jpg', link: 'https://www.ezmethods.com/' },
    { name: 'Steel Partners', image: 'assets/images/ez.jpg', link: 'https://www.ezmethods.com/' },
    { name: 'Media Partners', image: 'assets/images/ez.jpg', link: 'https://www.ezmethods.com/' }
    ];
    this.DataLoading = false;
    this.SetMetaTags();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Partners | ispace1" },
      { name: 'description', content: "Read each and every thing at ispace1 about special offers" }
    ];
    this.meta.SetPageTitle("Partners | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
}
