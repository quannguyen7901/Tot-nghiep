import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhongComponent } from './phong/phong.component';
import { DichvuComponent } from './dichvu/dichvu.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { GtComponent } from './gt/gt.component';
export const MainRoutes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            { path: '', component:HomeComponent },
            {path:'p',component:PhongComponent},
            {path:'dv',component:DichvuComponent},
            {path:'hd',component:HoadonComponent},
            {path:'gt',component:GtComponent}
        ]
    }]