import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'Core/Components/home/home.component';
import { LoginComponent } from 'Core/Components/login/login.component';
import { RegisterComponent } from 'Core/Components/register/register.component';
import { SharedModule } from 'Shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ]
})
export class CoreModule { }
