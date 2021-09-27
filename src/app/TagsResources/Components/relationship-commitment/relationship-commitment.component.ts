import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { RelationshipCommitmentService } from '../../Services/relationship-commitment.service';

@Component({
  selector: 'app-relationship-commitment',
  templateUrl: './relationship-commitment.component.html',
  styleUrls: ['./relationship-commitment.component.css']
})
export class RelationshipCommitmentComponent implements OnInit, OnDestroy {
  constructor(private RelationshipCommitmentService: RelationshipCommitmentService) { }
  subscribtion: Subscription;
  articlesList: any = [];
  url = "/Relationship-Commitment/";
  header = "Relationship & Commitment – Articles, Blogs, Comments, Discussions, Postings";
  lbl1 = "Here you will find the best collection of articles on Relationship & Commitment.";
  lbl2 = "Please feel free to browse them and leave your comments.";
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.RelationshipCommitmentService.clearList(this.articlesList);
    this.subscribtion = this.RelationshipCommitmentService.getList()
      .subscribe((data) => {
        this.RelationshipCommitmentService.parseXML(data)
          .then((data) => {
            this.articlesList = data;
          });
      }, (error: AppErrorHandler) => {
        throw error;
      });
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}
