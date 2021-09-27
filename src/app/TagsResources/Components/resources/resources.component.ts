import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor() { }

  isExpanedTage = false;
  ngOnInit(): void {
  }
  tagsToggle() {
    this.isExpanedTage = !this.isExpanedTage;
  }

}
