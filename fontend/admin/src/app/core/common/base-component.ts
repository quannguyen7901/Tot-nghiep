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
}