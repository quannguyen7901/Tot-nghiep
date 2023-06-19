import { Component, OnInit, AfterViewInit, Renderer2, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  title = 'admin';
  constructor(injector: Injector ){
    super(injector);
  }
  ngOnInit() { 
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js','assets/js/plugins/forms/selects/select2.min.js','assets/js/core/app.js');
  }

}