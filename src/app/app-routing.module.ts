import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from 'Account/Components/support/support.component';
import { HomeComponent } from 'Core/Components/home/home.component';
import { LoginComponent } from 'Core/Components/login/login.component';
import { RegisterComponent } from 'Core/Components/register/register.component';
import { ErrorComponent } from 'Shared/Components/error/error.component';
import { WeatherForecastComponent } from 'Shared/Components/weather-forecast/weather-forecast.component';
import { AuthGardService } from 'Shared/Services/auth-gard.service';
import { AuthStatusService } from 'Shared/Services/auth-status.service';
import { DeactivateGuard } from 'Shared/Services/can-deactivate-guard.service';
import { QuotesSayingsAuthorComponent } from 'TagsResources/Components/quotes-sayings-author/quotes-sayings-author.component';

import { ArticleDescriptionComponent } from './Account/Components/article-description/article-description.component';
import { InboxComponent } from './Account/Components/inbox/inbox.component';
import { InterestsComponent } from './Account/Components/interests/interests.component';
import { MyPostingsComponent } from './Account/Components/my-postings/my-postings.component';
import { NewArticleComponent } from './Account/Components/new-article/new-article.component';
import { PostingsComponent } from './Account/Components/postings/postings.component';
import { ProfileComponent } from './Account/Components/profile/profile.component';
import { ProfilesComponent } from './Account/Components/profiles/profiles.component';
import { SettingsComponent } from './Account/Components/settings/settings.component';
import { UpgradeComponent } from './Account/Components/upgrade/upgrade.component';
import { WallComponent } from './Account/Components/wall/wall.component';
import { AboutComponent } from './Footer/Components/about/about.component';
import { AdvertisingComponent } from './Footer/Components/advertising/advertising.component';
import { AnnouncementsComponent } from './Footer/Components/announcements/announcements.component';
import { CareersComponent } from './Footer/Components/careers/careers.component';
import { ContactusComponent } from './Footer/Components/contactus/contactus.component';
import { CookieuseComponent } from './Footer/Components/cookieuse/cookieuse.component';
import { CopyrightpolicyComponent } from './Footer/Components/copyrightpolicy/copyrightpolicy.component';
import { HelpComponent } from './Footer/Components/help/help.component';
import { PartnerComponent } from './Footer/Components/partner/partner.component';
import { PlansComponent } from './Footer/Components/plans/plans.component';
import { PrivacypolicyComponent } from './Footer/Components/privacypolicy/privacypolicy.component';
import { UseragreementComponent } from './Footer/Components/useragreement/useragreement.component';
import {
  AbbreviationsAcronymsDetailsComponent,
} from './TagsResources/Components/abbreviations-acronyms-details/abbreviations-acronyms-details.component';
import {
  AbbreviationsAcronymsComponent,
} from './TagsResources/Components/abbreviations-acronyms/abbreviations-acronyms.component';
import {
  ActivityPartnerDetailsComponent,
} from './TagsResources/Components/activity-partner-details/activity-partner-details.component';
import { ActivityPartnerComponent } from './TagsResources/Components/activity-partner/activity-partner.component';
import {
  AstrologyHoroscopeDetailsComponent,
} from './TagsResources/Components/astrology-horoscope-details/astrology-horoscope-details.component';
import { AstrologyHoroscopeComponent } from './TagsResources/Components/astrology-horoscope/astrology-horoscope.component';
import {
  AttractionCrushesDetailsComponent,
} from './TagsResources/Components/attraction-crushes-details/attraction-crushes-details.component';
import { AttractionCrushesComponent } from './TagsResources/Components/attraction-crushes/attraction-crushes.component';
import {
  BusinessPartnerDetailsComponent,
} from './TagsResources/Components/business-partner-details/business-partner-details.component';
import { BusinessPartnerComponent } from './TagsResources/Components/business-partner/business-partner.component';
import {
  CareerOpportunitiesDetailsComponent,
} from './TagsResources/Components/career-opportunities-details/career-opportunities-details.component';
import {
  CareerOpportunitiesComponent,
} from './TagsResources/Components/career-opportunities/career-opportunities.component';
import {
  ChemistryConnectionDetailsComponent,
} from './TagsResources/Components/chemistry-connection-details/chemistry-connection-details.component';
import {
  ChemistryConnectionComponent,
} from './TagsResources/Components/chemistry-connection/chemistry-connection.component';
import {
  DatingCourtshipDetailsComponent,
} from './TagsResources/Components/dating-courtship-details/dating-courtship-details.component';
import { DatingCourtshipComponent } from './TagsResources/Components/dating-courtship/dating-courtship.component';
import {
  ExtrasExtrasDetailsComponent,
} from './TagsResources/Components/extras-extras-details/extras-extras-details.component';
import { ExtrasExtrasComponent } from './TagsResources/Components/extras-extras/extras-extras.component';
import {
  FlirtingSeducingDetailsComponent,
} from './TagsResources/Components/flirting-seducing-details/flirting-seducing-details.component';
import { FlirtingSeducingComponent } from './TagsResources/Components/flirting-seducing/flirting-seducing.component';
import {
  FriendsAcquaintancesDetailsComponent,
} from './TagsResources/Components/friends-acquaintances-details/friends-acquaintances-details.component';
import {
  FriendsAcquaintancesComponent,
} from './TagsResources/Components/friends-acquaintances/friends-acquaintances.component';
import {
  GaysLesbiansDetailsComponent,
} from './TagsResources/Components/gays-lesbians-details/gays-lesbians-details.component';
import { GaysLesbiansComponent } from './TagsResources/Components/gays-lesbians/gays-lesbians.component';
import {
  HarmonyCompatibilityDetailsComponent,
} from './TagsResources/Components/harmony-compatibility-details/harmony-compatibility-details.component';
import {
  HarmonyCompatibilityComponent,
} from './TagsResources/Components/harmony-compatibility/harmony-compatibility.component';
import {
  HeartbreaksBreakupsDetailsComponent,
} from './TagsResources/Components/heartbreaks-breakups-details/heartbreaks-breakups-details.component';
import {
  HeartbreaksBreakupsComponent,
} from './TagsResources/Components/heartbreaks-breakups/heartbreaks-breakups.component';
import {
  HookupsAffairsDetailsComponent,
} from './TagsResources/Components/hookups-affairs-details/hookups-affairs-details.component';
import { HookupsAffairsComponent } from './TagsResources/Components/hookups-affairs/hookups-affairs.component';
import {
  IdiomsProverbsDetailsComponent,
} from './TagsResources/Components/idioms-proverbs-details/idioms-proverbs-details.component';
import { IdiomsProverbsComponent } from './TagsResources/Components/idioms-proverbs/idioms-proverbs.component';
import {
  InfidelityCheatingDetailsComponent,
} from './TagsResources/Components/infidelity-cheating-details/infidelity-cheating-details.component';
import { InfidelityCheatingComponent } from './TagsResources/Components/infidelity-cheating/infidelity-cheating.component';
import { JustFriendsDetailsComponent } from './TagsResources/Components/just-friends-details/just-friends-details.component';
import { JustFriendsComponent } from './TagsResources/Components/just-friends/just-friends.component';
import { LifeStyleDetailsComponent } from './TagsResources/Components/life-style-details/life-style-details.component';
import { LifeStyleComponent } from './TagsResources/Components/life-style/life-style.component';
import {
  LongRelationShipDetailsComponent,
} from './TagsResources/Components/long-relation-ship-details/long-relation-ship-details.component';
import { LongRelationShipComponent } from './TagsResources/Components/long-relation-ship/long-relation-ship.component';
import { LoveRomanceComponent } from './TagsResources/Components/love-romance/love-romance.component';
import {
  MarriageWeddingDetailsComponent,
} from './TagsResources/Components/marriage-wedding-details/marriage-wedding-details.component';
import { MarriageWeddingComponent } from './TagsResources/Components/marriage-wedding/marriage-wedding.component';
import {
  OpenRelationshipDetailsComponent,
} from './TagsResources/Components/open-relationship-details/open-relationship-details.component';
import { OpenRelationshipComponent } from './TagsResources/Components/open-relationship/open-relationship.component';
import {
  QuotesSayingsDetailsComponent,
} from './TagsResources/Components/quotes-sayings-details/quotes-sayings-details.component';
import { QuotesSayingsComponent } from './TagsResources/Components/quotes-sayings/quotes-sayings.component';
import {
  RelationshipCommitmentDetailsComponent,
} from './TagsResources/Components/relationship-commitment-details/relationship-commitment-details.component';
import {
  RelationshipCommitmentComponent,
} from './TagsResources/Components/relationship-commitment/relationship-commitment.component';
import { ResourcesComponent } from './TagsResources/Components/resources/resources.component';
import { SexIntimacyDetailsComponent } from './TagsResources/Components/sex-intimacy-details/sex-intimacy-details.component';
import { SexIntimacyComponent } from './TagsResources/Components/sex-intimacy/sex-intimacy.component';
import {
  ShortRelationShipDetailsComponent,
} from './TagsResources/Components/short-relation-ship-details/short-relation-ship-details.component';
import { ShortRelationShipComponent } from './TagsResources/Components/short-relation-ship/short-relation-ship.component';
import {
  SinglesUnattachedDetailsComponent,
} from './TagsResources/Components/singles-unattached-details/singles-unattached-details.component';
import { SinglesUnattachedComponent } from './TagsResources/Components/singles-unattached/singles-unattached.component';
import {
  SpousesCouplesDetailsComponent,
} from './TagsResources/Components/spouses-couples-details/spouses-couples-details.component';
import { SpousesCouplesComponent } from './TagsResources/Components/spouses-couples/spouses-couples.component';
import { TagsComponent } from './TagsResources/Components/tags/tags.component';
import {
  VirtualRelationshipDetailsComponent,
} from './TagsResources/Components/virtual-relationship-details/virtual-relationship-details.component';
import {
  VirtualRelationshipComponent,
} from './TagsResources/Components/virtual-relationship/virtual-relationship.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'About', component: AboutComponent,
  },
  { path: 'Partners', component: PartnerComponent },
  { path: 'Announcements', component: AnnouncementsComponent },
  { path: 'Plans', component: PlansComponent },
  { path: 'Advertising', component: AdvertisingComponent },
  { path: 'Careers', component: CareersComponent },
  { path: 'Help', component: HelpComponent },
  { path: 'ContactUs', component: ContactusComponent },
  { path: 'UserAgreement', component: UseragreementComponent },
  { path: 'PrivacyPolicy', component: PrivacypolicyComponent },
  { path: 'CopyrightPolicy', component: CopyrightpolicyComponent },
  { path: 'CookieUse', component: CookieuseComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent},
  { path: 'WeatherForecast', component: WeatherForecastComponent},
  // Tags Categories
  { path: 'Love-Romance', component: LoveRomanceComponent },
  { path: 'Love-Romance/:title', component: LoveRomanceComponent },
  { path: 'Dating-Courtship/:title', component: DatingCourtshipDetailsComponent },
  { path: 'Dating-Courtship', component: DatingCourtshipComponent },
  { path: 'Infidelity-Cheating/:title', component: InfidelityCheatingDetailsComponent },
  { path: 'Infidelity-Cheating', component: InfidelityCheatingComponent },
  { path: 'Heartbreaks-Breakups/:title', component: HeartbreaksBreakupsDetailsComponent },
  { path: 'Heartbreaks-Breakups', component: HeartbreaksBreakupsComponent },
  { path: 'Relationship-Commitment/:title', component: RelationshipCommitmentDetailsComponent },
  { path: 'Relationship-Commitment', component: RelationshipCommitmentComponent },
  { path: 'Singles-Unattached/:title', component: SinglesUnattachedDetailsComponent },
  { path: 'Singles-Unattached', component: SinglesUnattachedComponent },
  { path: 'Harmony-Compatibility/:title', component: HarmonyCompatibilityDetailsComponent },
  { path: 'Harmony-Compatibility', component: HarmonyCompatibilityComponent },
  { path: 'Spouses-Couples/:title', component: SpousesCouplesDetailsComponent },
  { path: 'Spouses-Couples', component: SpousesCouplesComponent },
  { path: 'Abbreviations-Acronyms/:title', component: AbbreviationsAcronymsDetailsComponent },
  { path: 'Abbreviations-Acronyms', component: AbbreviationsAcronymsComponent },
  { path: 'Quotes-Sayings/:title', component: QuotesSayingsDetailsComponent },
  { path: 'Quotes-Sayings', component: QuotesSayingsComponent },
  { path: 'Quotes-Sayings-author', component: QuotesSayingsAuthorComponent },
  { path: 'Life-Style/:title', component: LifeStyleDetailsComponent },
  { path: 'Life-Style', component: LifeStyleComponent },
  { path: 'Friends-Acquaintances/:title', component: FriendsAcquaintancesDetailsComponent },
  { path: 'Friends-Acquaintances', component: FriendsAcquaintancesComponent },
  { path: 'Hookups-Affairs/:title', component: HookupsAffairsDetailsComponent },
  { path: 'Hookups-Affairs', component: HookupsAffairsComponent },
  { path: 'Sex-Intimacy/:title', component: SexIntimacyDetailsComponent },
  { path: 'Sex-Intimacy', component: SexIntimacyComponent },
  { path: 'Marriage-Wedding/:title', component: MarriageWeddingDetailsComponent },
  { path: 'Marriage-Wedding', component: MarriageWeddingComponent },
  { path: 'Attraction-Crushes/:title', component: AttractionCrushesDetailsComponent },
  { path: 'Attraction-Crushes', component: AttractionCrushesComponent },
  { path: 'Flirting-Seducing/:title', component: FlirtingSeducingDetailsComponent },
  { path: 'Flirting-Seducing', component: FlirtingSeducingComponent },
  { path: 'Chemistry-Connection/:title', component: ChemistryConnectionDetailsComponent },
  { path: 'Chemistry-Connection', component: ChemistryConnectionComponent },
  { path: 'Gays-Lesbians/:title', component: GaysLesbiansDetailsComponent },
  { path: 'Gays-Lesbians', component: GaysLesbiansComponent },
  { path: 'Idioms-Proverbs/:title', component: IdiomsProverbsDetailsComponent },
  { path: 'Idioms-Proverbs', component: IdiomsProverbsComponent },
  { path: 'Astrology-Horoscope/:title', component: AstrologyHoroscopeDetailsComponent },
  { path: 'Astrology-Horoscope', component: AstrologyHoroscopeComponent },
  { path: 'Extras-Extras/:title', component: ExtrasExtrasDetailsComponent },
  { path: 'Extras-Extras', component: ExtrasExtrasComponent },
  // Resources categories
  { path: 'Just-Friends/:title', component: JustFriendsDetailsComponent },
  { path: 'Just-Friends', component: JustFriendsComponent },
  { path: 'Activity-Partner/:title', component: ActivityPartnerDetailsComponent },
  { path: 'Activity-Partner', component: ActivityPartnerComponent },
  { path: 'Virtual-Relationship/:title', component: VirtualRelationshipDetailsComponent },
  { path: 'Virtual-Relationship', component: VirtualRelationshipComponent },
  { path: 'Open-Relationship/:title', component: OpenRelationshipDetailsComponent },
  { path: 'Open-Relationship', component: OpenRelationshipComponent },
  { path: 'Short-Relationship/:title', component: ShortRelationShipDetailsComponent },
  { path: 'Short-Relationship', component: ShortRelationShipComponent },
  { path: 'Long-Relationship/:title', component: LongRelationShipDetailsComponent },
  { path: 'Long-Relationship', component: LongRelationShipComponent },
  { path: 'Business-Partner/:title', component: BusinessPartnerDetailsComponent },
  { path: 'Business-Partner', component: BusinessPartnerComponent },
  { path: 'Career-Opportunities/:title', component: CareerOpportunitiesDetailsComponent },
  { path: 'Career-Opportunities', component: CareerOpportunitiesComponent },
  //
  { path: 'Tags', component: TagsComponent },
  { path: 'Resources', component: ResourcesComponent },
  { path: 'Home/:UserName', component: WallComponent, canActivate: [AuthGardService, AuthStatusService] },
  { path: 'Profile/:UserName', component: ProfileComponent },
  { path: 'Profiles', component: ProfilesComponent, canActivate: [AuthStatusService] },
  { path: 'ProfileInterests', component: InterestsComponent, canActivate: [AuthGardService, AuthStatusService] },
  { path: 'NewPosting', component: NewArticleComponent, canActivate: [AuthGardService, AuthStatusService] },
  {
    path: 'Posting/:title/:id', component: ArticleDescriptionComponent,canActivate: [AuthStatusService],
  },
  { path: 'Postings', component: PostingsComponent, canActivate: [AuthStatusService] },
  { path: 'MyPostings', component: MyPostingsComponent, canActivate: [AuthGardService, AuthStatusService] },
  { path: 'Messages/:UserName', component: InboxComponent, canActivate: [AuthGardService, AuthStatusService] },
  { path: 'Settings', component: SettingsComponent, canActivate: [AuthGardService] },
  { path: 'Upgrade', component: UpgradeComponent, canActivate: [AuthGardService, AuthStatusService] },
  { path: 'Support', component: SupportComponent, canActivate: [AuthGardService] },
  { path: 'Error', component: ErrorComponent },
  { path: '**', redirectTo: '/Error' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
