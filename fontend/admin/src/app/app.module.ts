import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {PasswordModule} from 'primeng/password';
import {PaginatorModule} from 'primeng/paginator';
import {AccordionModule} from 'primeng/accordion'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from 'primeng/editor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PasswordModule,
    AccordionModule,PaginatorModule,EditorModule,
    BrowserAnimationsModule,
  ],
  exports:[PaginatorModule,ReactiveFormsModule,EditorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
