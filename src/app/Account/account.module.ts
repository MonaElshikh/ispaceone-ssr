import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPayPalModule } from 'ngx-paypal';
import { SharedModule } from 'Shared/shared.module';

import { ArticleDescriptionComponent } from './Components/article-description/article-description.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { InterestsComponent } from './Components/interests/interests.component';
import { MyPostingsComponent } from './Components/my-postings/my-postings.component';
import { NewArticleComponent } from './Components/new-article/new-article.component';
import { PostingsComponent } from './Components/postings/postings.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProfilesComponent } from './Components/profiles/profiles.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { SupportComponent } from './Components/support/support.component';
import { UpgradeComponent } from './Components/upgrade/upgrade.component';
import { WallComponent } from './Components/wall/wall.component';

@NgModule({
  declarations: [
    InboxComponent,
    InterestsComponent,
    PostingsComponent,
    ProfilesComponent,
    ProfileComponent,
    WallComponent,
    SettingsComponent,
    UpgradeComponent,
    ArticleDescriptionComponent,
    MyPostingsComponent,
    NewArticleComponent,
    SupportComponent
  ],
  imports: [
    SharedModule,
    NgxPayPalModule,
    RouterModule.forChild([]),
    AutosizeModule,
    ImageCropperModule,
    NgImageSliderModule,
  ],
})
export class AccountModule { }
