import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { OpenRelationshipService } from '../../Services/open-relationship.service';

@Component({
  selector: 'app-open-relationship',
  templateUrl: './open-relationship.component.html',
  styleUrls: ['./open-relationship.component.css']
})
export class OpenRelationshipComponent implements OnInit,OnDestroy {
  constructor(private OpenRelationshipService: OpenRelationshipService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Open-Relationship/";
  header = "Open Relationship – Articles, Blogs, Comments, Marriage & Wedding";
  lbl1 = "Here you will find the best collection of articles on Open Relationship.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList(){
    this.OpenRelationshipService.clearList(this.articlesList);
    // this.articlesList = this.loveRomanceService.getAll();
    this.subscribtion = this.OpenRelationshipService.getList()
      .subscribe((data) => {
        this.OpenRelationshipService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
          });
      }), (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }

}
