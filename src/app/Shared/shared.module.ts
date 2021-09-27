import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationModule } from 'jw-angular-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngleDownComponent } from 'Shared/Components/angle-down/angle-down.component';
import { AngleUpComponent } from 'Shared/Components/angle-up/angle-up.component';
import { DisLikeComponent } from 'Shared/Components/dis-like/dis-like.component';
import { GallreyViewComponent } from 'Shared/Components/gallrey-view/gallrey-view.component';
import { HidePwComponent } from 'Shared/Components/hide-pw/hide-pw.component';
import { LikeComponent } from 'Shared/Components/like/like.component';
import { ListViewComponent } from 'Shared/Components/list-view/list-view.component';
import { ShowPwComponent } from 'Shared/Components/show-pw/show-pw.component';
import { SvgCloseComponent } from 'Shared/Components/svg-close/svg-close.component';
import { SvgHomeComponent } from 'Shared/Components/svg-home/svg-home.component';
import { SvgInterestsComponent } from 'Shared/Components/svg-interests/svg-interests.component';
import { SvgMessagesComponent } from 'Shared/Components/svg-messages/svg-messages.component';
import { SvgMoreComponent } from 'Shared/Components/svg-more/svg-more.component';
import { SvgPostComponent } from 'Shared/Components/svg-post/svg-post.component';
import { SvgPostingsComponent } from 'Shared/Components/svg-postings/svg-postings.component';
import { SvgProfileComponent } from 'Shared/Components/svg-profile/svg-profile.component';
import { SvgProfilesComponent } from 'Shared/Components/svg-profiles/svg-profiles.component';
import { SvgReloadComponent } from 'Shared/Components/svg-reload/svg-reload.component';
import { SvgStarComponent } from 'Shared/Components/svg-star/svg-star.component';
import { SvgToolsComponent } from 'Shared/Components/svg-tools/svg-tools.component';
import { TickComponent } from 'Shared/Components/tick/tick.component';

import { AddsComponent } from './Components/adds/adds.component';
import { CaptchaComponent } from './Components/captcha/captcha.component';
import { CharsCounterComponent } from './Components/chars-counter/chars-counter.component';
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';
import { ContributionComponent } from './Components/contribution/contribution.component';
import { CustomFieldsComponent } from './Components/custom-fields/custom-fields.component';
import { ErrorComponent } from './Components/error/error.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MyHistoryComponent } from './Components/my-history/my-history.component';
import { MyRelationShipComponent } from './Components/my-relation-ship/my-relation-ship.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PasswordStrengthComponent } from './Components/password-strength/password-strength.component';
import { StatsBoxesComponent } from './Components/stats-boxes/stats-boxes.component';
import { onCreateDirective } from './Directives/onCreate.directive';
import { AuthGardService } from './Services/auth-gard.service';
import { AuthStatusService } from './Services/auth-status.service';
import { ConfirmDialogService } from './Services/confirm-dialog.service';
import { CountryService } from './Services/country.service';
import { ErrorHandlerService } from './Services/error-handler.service';
import { LocalstorageService } from './Services/local-storage.service';
import { MetaTagslService } from './Services/metaTags.service';
import { SvgRepliedComponent } from './Components/svg-replied/svg-replied.component';
import { SvgUnrepliedComponent } from './Components/svg-unreplied/svg-unreplied.component';
import { SvgReadComponent } from './Components/svg-read/svg-read.component';
import { SvgUnreadComponent } from './Components/svg-unread/svg-unread.component';
import { WindowObjectService } from './Services/window-object.service';
import { WeatherForecastService } from './Services/weather-forecast.service';
import { WeatherForecastComponent } from './Components/weather-forecast/weather-forecast.component';
import { SvgLoveComponent } from './Components/svg-love/svg-love.component';

@NgModule({
  declarations: [
    AddsComponent,
    MyHistoryComponent,
    MyRelationShipComponent,
    ContributionComponent,
    ListViewComponent,
    PasswordStrengthComponent,
    GallreyViewComponent,
    TickComponent,
    AngleDownComponent,
    AngleUpComponent,
    LikeComponent,
    DisLikeComponent,
    SvgHomeComponent,
    SvgProfilesComponent,
    SvgProfileComponent,
    SvgPostComponent,
    SvgPostingsComponent,
    SvgToolsComponent,
    SvgMessagesComponent,
    SvgInterestsComponent,
    SvgMoreComponent,
    SvgCloseComponent,
    SvgStarComponent,
    CaptchaComponent,
    ShowPwComponent,
    HidePwComponent,
    ErrorComponent,
    ConfirmDialogComponent,
    SvgReloadComponent,
    StatsBoxesComponent,
    CharsCounterComponent,
    CustomFieldsComponent,
    FooterComponent,
    NavbarComponent,
    onCreateDirective,
    SvgRepliedComponent,
    SvgUnrepliedComponent,
    SvgReadComponent,
    SvgUnreadComponent,
    WeatherForecastComponent,
    SvgLoveComponent,
  ],
  imports: [
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwPaginationModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    RouterModule.forChild([]),
    NgxSkeletonLoaderModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AddsComponent,
    MyHistoryComponent,
    MyRelationShipComponent,
    ContributionComponent,
    ListViewComponent,
    PasswordStrengthComponent,
    GallreyViewComponent,
    TickComponent,
    AngleDownComponent,
    AngleUpComponent,
    LikeComponent,
    onCreateDirective,
    DisLikeComponent,
    SvgHomeComponent,
    SvgProfilesComponent,
    SvgProfileComponent,
    SvgPostComponent,
    SvgPostingsComponent,
    SvgToolsComponent,
    SvgMessagesComponent,
    SvgInterestsComponent,
    SvgMoreComponent,
    SvgCloseComponent,
    SvgStarComponent,
    SvgReloadComponent,
    CaptchaComponent,
    ShowPwComponent,
    HidePwComponent,
    ErrorComponent,
    ConfirmDialogComponent,
    StatsBoxesComponent,
    CharsCounterComponent,
    CustomFieldsComponent,
    FooterComponent,
    NavbarComponent,
    JwPaginationModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    SvgRepliedComponent,
    SvgUnrepliedComponent,
    SvgReadComponent,
    SvgUnreadComponent,
    SvgLoveComponent,
  ],
  providers: [
    AuthStatusService,
    AuthGardService,
    MetaTagslService,
    CountryService,
    LocalstorageService,
    ConfirmDialogService,
    ErrorHandlerService,
    Title,
    DatePipe,
    DecimalPipe,
    WindowObjectService,
    WeatherForecastService
  ]
})
export class SharedModule { }
