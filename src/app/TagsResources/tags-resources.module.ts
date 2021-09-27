import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DisqusModule } from 'ngx-disqus';
import { SharedModule } from 'Shared/shared.module';

import {
  AbbreviationsAcronymsDetailsComponent,
} from './Components/abbreviations-acronyms-details/abbreviations-acronyms-details.component';
import { AbbreviationsAcronymsComponent } from './Components/abbreviations-acronyms/abbreviations-acronyms.component';
import { ActivityPartnerDetailsComponent } from './Components/activity-partner-details/activity-partner-details.component';
import { ActivityPartnerComponent } from './Components/activity-partner/activity-partner.component';
import {
  AstrologyHoroscopeDetailsComponent,
} from './Components/astrology-horoscope-details/astrology-horoscope-details.component';
import { AstrologyHoroscopeComponent } from './Components/astrology-horoscope/astrology-horoscope.component';
import {
  AttractionCrushesDetailsComponent,
} from './Components/attraction-crushes-details/attraction-crushes-details.component';
import { AttractionCrushesComponent } from './Components/attraction-crushes/attraction-crushes.component';
import { BusinessPartnerDetailsComponent } from './Components/business-partner-details/business-partner-details.component';
import { BusinessPartnerComponent } from './Components/business-partner/business-partner.component';
import {
  CareerOpportunitiesDetailsComponent,
} from './Components/career-opportunities-details/career-opportunities-details.component';
import { CareerOpportunitiesComponent } from './Components/career-opportunities/career-opportunities.component';
import {
  ChemistryConnectionDetailsComponent,
} from './Components/chemistry-connection-details/chemistry-connection-details.component';
import { ChemistryConnectionComponent } from './Components/chemistry-connection/chemistry-connection.component';
import { DatingCourtshipDetailsComponent } from './Components/dating-courtship-details/dating-courtship-details.component';
import { DatingCourtshipComponent } from './Components/dating-courtship/dating-courtship.component';
import { ExtrasExtrasDetailsComponent } from './Components/extras-extras-details/extras-extras-details.component';
import { ExtrasExtrasComponent } from './Components/extras-extras/extras-extras.component';
import {
  FlirtingSeducingDetailsComponent,
} from './Components/flirting-seducing-details/flirting-seducing-details.component';
import { FlirtingSeducingComponent } from './Components/flirting-seducing/flirting-seducing.component';
import {
  FriendsAcquaintancesDetailsComponent,
} from './Components/friends-acquaintances-details/friends-acquaintances-details.component';
import { FriendsAcquaintancesComponent } from './Components/friends-acquaintances/friends-acquaintances.component';
import { GaysLesbiansDetailsComponent } from './Components/gays-lesbians-details/gays-lesbians-details.component';
import { GaysLesbiansComponent } from './Components/gays-lesbians/gays-lesbians.component';
import {
  HarmonyCompatibilityDetailsComponent,
} from './Components/harmony-compatibility-details/harmony-compatibility-details.component';
import { HarmonyCompatibilityComponent } from './Components/harmony-compatibility/harmony-compatibility.component';
import {
  HeartbreaksBreakupsDetailsComponent,
} from './Components/heartbreaks-breakups-details/heartbreaks-breakups-details.component';
import { HeartbreaksBreakupsComponent } from './Components/heartbreaks-breakups/heartbreaks-breakups.component';
import { HookupsAffairsDetailsComponent } from './Components/hookups-affairs-details/hookups-affairs-details.component';
import { HookupsAffairsComponent } from './Components/hookups-affairs/hookups-affairs.component';
import { IdiomsProverbsDetailsComponent } from './Components/idioms-proverbs-details/idioms-proverbs-details.component';
import { IdiomsProverbsComponent } from './Components/idioms-proverbs/idioms-proverbs.component';
import {
  InfidelityCheatingDetailsComponent,
} from './Components/infidelity-cheating-details/infidelity-cheating-details.component';
import { InfidelityCheatingComponent } from './Components/infidelity-cheating/infidelity-cheating.component';
import { JustFriendsDetailsComponent } from './Components/just-friends-details/just-friends-details.component';
import { JustFriendsComponent } from './Components/just-friends/just-friends.component';
import { LifeStyleDetailsComponent } from './Components/life-style-details/life-style-details.component';
import { LifeStyleComponent } from './Components/life-style/life-style.component';
import {
  LongRelationShipDetailsComponent,
} from './Components/long-relation-ship-details/long-relation-ship-details.component';
import { LongRelationShipComponent } from './Components/long-relation-ship/long-relation-ship.component';
import { LoveRomanceComponent } from './Components/love-romance/love-romance.component';
import { MarriageWeddingDetailsComponent } from './Components/marriage-wedding-details/marriage-wedding-details.component';
import { MarriageWeddingComponent } from './Components/marriage-wedding/marriage-wedding.component';
import {
  OpenRelationshipDetailsComponent,
} from './Components/open-relationship-details/open-relationship-details.component';
import { OpenRelationshipComponent } from './Components/open-relationship/open-relationship.component';
import { QuotesSayingsDetailsComponent } from './Components/quotes-sayings-details/quotes-sayings-details.component';
import { QuotesSayingsComponent } from './Components/quotes-sayings/quotes-sayings.component';
import {
  RelationshipCommitmentDetailsComponent,
} from './Components/relationship-commitment-details/relationship-commitment-details.component';
import { RelationshipCommitmentComponent } from './Components/relationship-commitment/relationship-commitment.component';
import { ResourcesComponent } from './Components/resources/resources.component';
import { SexIntimacyDetailsComponent } from './Components/sex-intimacy-details/sex-intimacy-details.component';
import { SexIntimacyComponent } from './Components/sex-intimacy/sex-intimacy.component';
import {
  ShortRelationShipDetailsComponent,
} from './Components/short-relation-ship-details/short-relation-ship-details.component';
import { ShortRelationShipComponent } from './Components/short-relation-ship/short-relation-ship.component';
import {
  SinglesUnattachedDetailsComponent,
} from './Components/singles-unattached-details/singles-unattached-details.component';
import { SinglesUnattachedComponent } from './Components/singles-unattached/singles-unattached.component';
import { SpousesCouplesDetailsComponent } from './Components/spouses-couples-details/spouses-couples-details.component';
import { SpousesCouplesComponent } from './Components/spouses-couples/spouses-couples.component';
import { TagesresourcesDetailsComponent } from './Components/tagesresources-details/tagesresources-details.component';
import { TagesresourcesListComponent } from './Components/tagesresources-list/tagesresources-list.component';
import { TagesresoursesLeftmenuComponent } from './Components/tagesresourses-leftmenu/tagesresourses-leftmenu.component';
import { TagsComponent } from './Components/tags/tags.component';
import {
  VirtualRelationshipDetailsComponent,
} from './Components/virtual-relationship-details/virtual-relationship-details.component';
import { VirtualRelationshipComponent } from './Components/virtual-relationship/virtual-relationship.component';
import { AbbreviationsAcronymsService } from './Services/abbreviations-acronyms.service';
import { ActivityPartnerService } from './Services/activity-partner.service';
import { AstrologyHoroscopeService } from './Services/astrology-horoscope.service';
import { AttractionCrushesService } from './Services/attraction-crushes.service';
import { BusinessPartnerService } from './Services/business-partner.service';
import { CareerOpportunitiesService } from './Services/career-opportunities.service';
import { ChemistryConnectionngService } from './Services/chemistry-connectionng.service';
import { DatingCourtshipService } from './Services/dating-courtship.service';
import { ExtrasExtrasService } from './Services/extras-extras.service';
import { FlirtingSeducingService } from './Services/flirting-seducing.service';
import { FriendsAcquaintancesService } from './Services/friends-acquaintances.service';
import { GaysLesbiansService } from './Services/gays-lesbians.service';
import { HarmonyCompatibilityService } from './Services/harmony-compatibility.service';
import { HeartbreaksBreakupsService } from './Services/heartbreaks-breakups.service';
import { HookupsAffairsService } from './Services/hookups-affairs.service';
import { IdiomsProverbsService } from './Services/idioms-proverbs.service';
import { InfidelityCheatingService } from './Services/infidelity-cheating.service';
import { JustFriendsService } from './Services/just-friends.service';
import { LifeStyleService } from './Services/life-style.service';
import { LongRelationShipService } from './Services/long-relation-ship.service';
import { LoveRomanceService } from './Services/love-romance.service';
import { MarriageWeddingService } from './Services/marriage-wedding.service';
import { OpenRelationshipService } from './Services/open-relationship.service';
import { QuotesSayingsService } from './Services/quotes-sayings.service';
import { RelationshipCommitmentService } from './Services/relationship-commitment.service';
import { SexIntimacyService } from './Services/sex-intimacy.service';
import { ShortRelationShipService } from './Services/short-relation-ship.service';
import { SinglesUnattachedService } from './Services/singles-unattached.service';
import { SpousesCouplesService } from './Services/spouses-couples.service';
import { TagsResourcesParentService } from './Services/tags-resources-parent.service';
import { VirtualRelationshipService } from './Services/virtual-relationship.service';
import { QuotesSayingsAuthorComponent } from './Components/quotes-sayings-author/quotes-sayings-author.component';
import { QuotesSayingsAuthorDetailsComponent } from './Components/quotes-sayings-author-details/quotes-sayings-author-details.component';
import { QuotesSayingsByAuthorService } from './Services/quotes-sayings-by-author.service';

@NgModule({
  declarations: [
    AstrologyHoroscopeComponent,
    AttractionCrushesComponent,
    ChemistryConnectionComponent,
    DatingCourtshipComponent,
    ExtrasExtrasComponent,
    FlirtingSeducingComponent,
    FriendsAcquaintancesComponent,
    GaysLesbiansComponent,
    HarmonyCompatibilityComponent,
    HeartbreaksBreakupsComponent,
    HookupsAffairsComponent,
    InfidelityCheatingComponent,
    LifeStyleComponent,
    LoveRomanceComponent,
    MarriageWeddingComponent,
    QuotesSayingsComponent,
    RelationshipCommitmentComponent,
    ResourcesComponent,
    SexIntimacyComponent,
    SinglesUnattachedComponent,
    SpousesCouplesComponent,
    TagesresourcesDetailsComponent,
    TagesresourcesListComponent,
    TagesresoursesLeftmenuComponent,
    TagsComponent,
    JustFriendsComponent,
    ActivityPartnerComponent,
    VirtualRelationshipComponent,
    OpenRelationshipComponent,
    ShortRelationShipComponent,
    LongRelationShipComponent,
    BusinessPartnerComponent,
    CareerOpportunitiesComponent,
    AbbreviationsAcronymsComponent,
    IdiomsProverbsComponent,
    AbbreviationsAcronymsDetailsComponent,
    ActivityPartnerDetailsComponent,
    AstrologyHoroscopeDetailsComponent,
    AttractionCrushesDetailsComponent,
    BusinessPartnerDetailsComponent,
    CareerOpportunitiesDetailsComponent,
    ChemistryConnectionDetailsComponent,
    DatingCourtshipDetailsComponent,
    ExtrasExtrasDetailsComponent,
    FlirtingSeducingDetailsComponent,
    FriendsAcquaintancesDetailsComponent,
    GaysLesbiansDetailsComponent,
    HarmonyCompatibilityDetailsComponent,
    HeartbreaksBreakupsDetailsComponent,
    HookupsAffairsDetailsComponent,
    IdiomsProverbsDetailsComponent,
    InfidelityCheatingDetailsComponent,
    JustFriendsDetailsComponent,
    LifeStyleDetailsComponent,
    LongRelationShipDetailsComponent,
    MarriageWeddingDetailsComponent,
    OpenRelationshipDetailsComponent,
    QuotesSayingsDetailsComponent,
    RelationshipCommitmentDetailsComponent,
    SexIntimacyDetailsComponent,
    ShortRelationShipDetailsComponent,
    SinglesUnattachedDetailsComponent,
    SpousesCouplesDetailsComponent,
    VirtualRelationshipDetailsComponent,
    QuotesSayingsAuthorComponent,
    QuotesSayingsAuthorDetailsComponent,
  ],
  imports: [
    RouterModule.forChild([]),
    SharedModule,
    DisqusModule.forRoot('ispace1'),
  ],
  providers: [
    TagsResourcesParentService,
    AbbreviationsAcronymsService,
    ActivityPartnerService,
    AstrologyHoroscopeService,
    AttractionCrushesService,
    BusinessPartnerService,
    CareerOpportunitiesService,
    ChemistryConnectionngService,
    DatingCourtshipService,
    ExtrasExtrasService,
    FlirtingSeducingService,
    FriendsAcquaintancesService,
    GaysLesbiansService,
    HarmonyCompatibilityService,
    HeartbreaksBreakupsService,
    HookupsAffairsService,
    IdiomsProverbsService,
    InfidelityCheatingService,
    JustFriendsService,
    LifeStyleService,
    LongRelationShipService,
    LoveRomanceService,
    MarriageWeddingService,
    OpenRelationshipService,
    QuotesSayingsService,
    RelationshipCommitmentService,
    SexIntimacyService,
    ShortRelationShipService,
    SinglesUnattachedService,
    SpousesCouplesService,
    VirtualRelationshipService,
    QuotesSayingsByAuthorService
  ]
})
export class TagsResourcesModule { }
