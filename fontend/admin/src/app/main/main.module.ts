import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.route';
import { MainComponent } from './main.component';
import { KhComponent } from './kh/kh.component';
import { PhongComponent } from './phong/phong.component';
import { OtoComponent } from './oto/oto.component';
import { ThucdonComponent } from './thucdon/thucdon.component';
import { YeucauComponent } from './yeucau/yeucau.component';
import { NvComponent } from './nv/nv.component';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import {EditorModule} from 'primeng/editor';
import {ToastModule} from 'primeng/toast';
import { ThueComponent } from './thue/thue.component';

@NgModule({
    declarations: [MainComponent, KhComponent, PhongComponent, OtoComponent, ThucdonComponent, YeucauComponent, NvComponent, ThueComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PaginatorModule,EditorModule,
        RouterModule.forChild(MainRoutes),
        ToastModule,
        ]
})
export class MainModule { }
