import { Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
export class BaseComponent {
    public renderer: any;
    public route: ActivatedRoute;
    public api : ApiService
    constructor(injector: Injector) {
        this.renderer = injector.get(Renderer2);
        this.route = injector.get(ActivatedRoute);
        this.api = injector.get(ApiService);
    }
    public loadScripts(...list: string[] ) {
        list.forEach(x=> {
            this.renderExternalScript(x).onload = () => {
            }
        })
    }
    public renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }
    public formatDate(date:any) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
      }
}