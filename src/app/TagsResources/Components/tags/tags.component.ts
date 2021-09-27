import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor() { }

  isExpanedTage = false;
  ngOnInit(): void {
  }
  tagsToggle() {
    this.isExpanedTage = !this.isExpanedTage;
  }

}
