import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { DashbordAdminComponent } from 'src/app/modules/dashbordAdmin/dashbordAdmin.component';
import { DashbordUserComponent } from 'src/app/modules/dashbordUser/dashbordUser.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    DefaultComponent,
    DashbordAdminComponent,
    DashbordUserComponent
  ]
})
export class DefaultModule { }
