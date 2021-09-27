import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { AstrologyHoroscopeService } from '../../Services/astrology-horoscope.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-astrology-horoscope',
  templateUrl: './astrology-horoscope.component.html',
  styleUrls: ['./astrology-horoscope.component.css']
})
export class AstrologyHoroscopeComponent implements OnInit ,OnDestroy {
  constructor(
    private AstrologyHoroscopeService: AstrologyHoroscopeService,
    private metaService: MetaTagslService) { }
  articlesList: any = [];
  subscribtion:Subscription;
  url = "/Astrology-Horoscope/";
  header = "Astrology & Horoscope – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Astrology & Horoscope.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.subscribtion = this.AstrologyHoroscopeService.getList()
    .subscribe((data) => {
      this.AstrologyHoroscopeService.parseXML(data)
        .then((data) => {
          this.articlesList = data;
        });
    }), (error: AppErrorHandler) => {
      throw error;
    };
  }
  ngOnDestroy(){
    if(this.subscribtion) this.subscribtion.unsubscribe();
  }
}
