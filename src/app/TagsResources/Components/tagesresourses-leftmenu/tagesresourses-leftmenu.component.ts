import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagesresourses-leftmenu',
  templateUrl: './tagesresourses-leftmenu.component.html',
  styleUrls: ['./tagesresourses-leftmenu.component.css']
})
export class TagesresoursesLeftmenuComponent implements OnInit {

  constructor() { }
  @Input() isTagsLeftMenu: boolean = true;
  isColapse = true;
  ngOnInit(): void {
  }
  toggleDisplay() {
    this.isColapse = !this.isColapse;
  }
}
