import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'Shared/Services/auth.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = "ispaceone | friends, love, romance, relationship, dating, affair";
  constructor(private metaService: Meta,
    private titleService: Title,
    private CanonicalService: MetaTagslService,
    ) { }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(
      { name: 'title', content: 'ispaceone | friends, love, romance, relationship, dating, affair' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'ispaceone, friends, love, romance, relationship, dating, affair, singles, hookups, crushes, flirting, match, date, companion, personals, lover, partner, soulmate.' }
    );
    this.CanonicalService.setCanonicalURL();
   
  }
}
