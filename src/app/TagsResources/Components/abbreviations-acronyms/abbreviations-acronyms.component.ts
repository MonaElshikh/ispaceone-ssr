import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { AbbreviationsAcronymsService } from '../../Services/abbreviations-acronyms.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-abbreviations-acronyms',
  templateUrl: './abbreviations-acronyms.component.html',
  styleUrls: ['./abbreviations-acronyms.component.css']
})
export class AbbreviationsAcronymsComponent implements OnInit, OnDestroy {
  constructor(private AbbreviationsAcronymsService: AbbreviationsAcronymsService,
    private metaService: MetaTagslService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Abbreviations-Acronyms/";
  header = "Abbreviations & Acronyms – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Abbreviations & Acronyms.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.subscribtion = this.AbbreviationsAcronymsService.getList()
    .subscribe((data) => {
      this.AbbreviationsAcronymsService.parseXML(data)
        .then((data) => {
          this.articlesList = data;
        })
    }, (error: AppErrorHandler) => {
      throw error;
    });
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}
