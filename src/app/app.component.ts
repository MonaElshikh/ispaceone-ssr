import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'Shared/Services/auth.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  static isBrowser = new BehaviorSubject<boolean>(null);
  routerSubscription: Subscription;
  title: string; url = ''; isHome = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any
    , private router: Router,
    private localStorage: LocalstorageService,
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(this.platformId));
  }
  ngOnInit(): void {
    // CODE TO SCROLL TOP WHEN NAVIGATION
    this.routerSubscription = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.router.url === "/") {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
      if (AppComponent.isBrowser) { window.scrollTo(0, 0); }
    });
   
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
