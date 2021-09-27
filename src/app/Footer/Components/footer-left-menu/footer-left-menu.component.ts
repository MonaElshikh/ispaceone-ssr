import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-left-menu',
  templateUrl: './footer-left-menu.component.html',
  styleUrls: ['./footer-left-menu.component.css']
})
export class FooterLeftMenuComponent implements OnInit {

  constructor() { }
  isColapse = true;
  ngOnInit(): void {
  }
  toggleDisplay() {
    this.isColapse = !this.isColapse;
  }
}
