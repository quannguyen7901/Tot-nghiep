import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'primeng/toast';
import { DangkyComponent } from './dangky/dangky.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DangkyComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
})
export class AppModule { }
