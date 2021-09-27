import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AnnouncementsService } from '../../Services/announcements.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  metaTags: MetaDefinition[] = [];
  AnnouncementData: any = [];
  AnnouncementSubscription: Subscription;
  DataLoading = true;
  constructor(private meta: MetaTagslService,
    private AnnouncementS: AnnouncementsService) { }
  ngOnInit(): void {
    this.SetMetaTags();
    this.BindAnnouncement();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Announcements | ispace1" },
      { name: 'description', content: "Read everything about the announcements at ispace1" }
    ];
    this.meta.SetPageTitle("Announcements | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindAnnouncement() {
    this.AnnouncementSubscription = this.AnnouncementS.getList()
      .subscribe((data) => {
        this.AnnouncementS.parseFooterXml(data)
          .then((data) => {
            this.AnnouncementData = data;
            this.DataLoading = false;
            console.log("AnnouncementData .title>> " + this.AnnouncementData[0].title);
          })
      }, (err) => {
        throw err;
      });
  }
}
