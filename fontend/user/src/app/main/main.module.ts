import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.route';
import { MainComponent } from './main.component';
import { PhongComponent } from './phong/phong.component';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { HoadonComponent } from './hoadon/hoadon.component';
import { DichvuComponent } from './dichvu/dichvu.component';
import { GtComponent } from './gt/gt.component';



@NgModule({
  declarations: [
    MainComponent,
    PhongComponent,
    HomeComponent,
    HoadonComponent,
    DichvuComponent,
    GtComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepsModule,
    ToastModule,
    RouterModule.forChild(MainRoutes),
  ]
})
export class MainModule { }
