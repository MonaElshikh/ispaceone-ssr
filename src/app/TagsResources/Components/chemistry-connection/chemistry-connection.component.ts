import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { ChemistryConnectionngService } from '../../Services/chemistry-connectionng.service';

@Component({
  selector: 'app-chemistry-connection',
  templateUrl: './chemistry-connection.component.html',
  styleUrls: ['./chemistry-connection.component.css']
})
export class ChemistryConnectionComponent implements OnInit,OnDestroy {
  constructor(private ChemistryConnectionngService: ChemistryConnectionngService) { }
  articlesList: any = [];
  subscribtion: Subscription;
  url = "/Chemistry-Connection/";
  header = "Chemistry & Connection – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Chemistry & Connection.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.subscribtion = this.ChemistryConnectionngService.getList()
      .subscribe((data) => {
        this.ChemistryConnectionngService.parseXML(data)
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
