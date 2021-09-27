import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AccountModule } from 'Account/account.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'Shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { FooterModule } from './Footer/footer.module';
import { TagsResourcesModule } from './TagsResources/tags-resources.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    AccountModule,
    FooterModule,
    TagsResourcesModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    AngularSvgIconModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton: true,
      autoDismiss:true
    }),
    
  ],
  providers:[
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
