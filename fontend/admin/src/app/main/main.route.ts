import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KhComponent } from './kh/kh.component';
import { PhongComponent } from './phong/phong.component';
import { OtoComponent } from './oto/oto.component';
import { NvComponent } from './nv/nv.component';
import { ThucdonComponent } from './thucdon/thucdon.component';
import { YeucauComponent } from './yeucau/yeucau.component';
import { ThueComponent } from './thue/thue.component';
export const MainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'kh', component: KhComponent},
      { path: 'phong',component:PhongComponent},
      { path: 'oto', component: OtoComponent },
      { path: 'nv', component: NvComponent },
      { path: 'thucdon',component:ThucdonComponent},
      { path: 'yeucau',component: YeucauComponent},
      { path: 'th',component: ThueComponent},
    ]
  }
];