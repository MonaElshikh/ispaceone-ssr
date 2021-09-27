import { Component, OnInit } from '@angular/core';
import { AuthService } from 'Shared/Services/auth.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public errorMessage: string = "";
  url = "/";
  constructor(private meta: MetaTagslService, private authS: AuthService) {
    this.meta.SetPageTitle("Error")
  }
  ngOnInit(): void {
    if (this.authS.isLoggedIn()) {
      this.url = "/Home/" + this.authS.getUname();
    }
  }
}
