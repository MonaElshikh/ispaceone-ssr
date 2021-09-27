import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'Shared/shared.module';
import { AboutComponent } from './Components/about/about.component';
import { AdvertisingComponent } from './Components/advertising/advertising.component';
import { AnnouncementsComponent } from './Components/announcements/announcements.component';
import { CareersComponent } from './Components/careers/careers.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { CookieuseComponent } from './Components/cookieuse/cookieuse.component';
import { CopyrightpolicyComponent } from './Components/copyrightpolicy/copyrightpolicy.component';
import { FooterLeftMenuComponent } from './Components/footer-left-menu/footer-left-menu.component';
import { HelpComponent } from './Components/help/help.component';
import { PartnerComponent } from './Components/partner/partner.component';
import { PlansComponent } from './Components/plans/plans.component';
import { PrivacypolicyComponent } from './Components/privacypolicy/privacypolicy.component';
import { UseragreementComponent } from './Components/useragreement/useragreement.component';
@NgModule({
  declarations: [
    AboutComponent,
    AdvertisingComponent,
    AnnouncementsComponent,
    CareersComponent,
    ContactusComponent,
    CookieuseComponent,
    CopyrightpolicyComponent,
    HelpComponent,
    FooterLeftMenuComponent,
    PartnerComponent,
    PlansComponent,
    PrivacypolicyComponent,
    UseragreementComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ]
})
export class FooterModule { }
