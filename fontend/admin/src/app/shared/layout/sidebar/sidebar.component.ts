import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor(private renderer: Renderer2){}
    ngOnInit() { 
  
    }
    // ngAfterViewInit() { 
    //  this.loadScripts();
    // }
  
    // public loadScripts() {
    //   this.renderExternalScript('./assets/js/plugins/loaders/pace.min.js').onload = () => {
    //   }
     
    //   this.renderExternalScript('./assets/js/core/libraries/jquery.min.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/core/libraries/bootstrap.min.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/plugins/loaders/blockui.min.js').onload = () => {
    //   }
     
    //   this.renderExternalScript('./assets/js/plugins/visualization/d3/d3.min.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/plugins/visualization/d3/d3_tooltip.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/plugins/forms/styling/switchery.min.js').onload = () => {
    //   }
     
    //   this.renderExternalScript('./assets/js/plugins/forms/styling/uniform.min.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/plugins/forms/selects/bootstrap_multiselect.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/plugins/ui/moment/moment.min.js').onload = () => {
    //   }
     
    //   this.renderExternalScript('./assets/js/plugins/pickers/daterangepicker.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/core/app.js').onload = () => {
    //   }
    //   this.renderExternalScript('./assets/js/pages/dashboard.js').onload = () => {
    //   }
    // }
  
    // public renderExternalScript(src: string): HTMLScriptElement {
    //     const script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.src = src;
    //     script.async = true;
    //     script.defer = true;
    //     this.renderer.appendChild(document.body, script);
    //     return script;
    //   }
    
  }
  