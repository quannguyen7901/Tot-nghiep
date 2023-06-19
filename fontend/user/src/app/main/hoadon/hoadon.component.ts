import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})
export class HoadonComponent extends BaseComponent implements OnInit{
  constructor(inject:Injector,private dn:AuthenticationService,private router:Router,private cookie:CookieService){
    super(inject);
  }
  public alo:any;
  public sum=0;
  ngOnInit(): void {
    var url=location.search
    if(url!=""){
      if(url.includes("vnp_ResponseCode=00")){
        this.api.post(`/api/Hoadon/delete`,{id: localStorage.getItem('idhd')}).subscribe(res => {
          this.alo=res
          location.href="https://thanglonghotel.netlify.app/hd"
        });
      }
      if(url.includes("vnp_ResponseCode=24")){
        location.href="https://thanglonghotel.netlify.app/hd"
      }
    }
    this.api.post(`/api/Hoadon/gethoadon`,{id:this.cookie.get('id')}).subscribe(res => {
      this.alo=res
      for (let i = 0; i < this.alo.length; i++) {
        this.sum+=this.alo[i].tien
        const d = new Date(this.alo[i].ngaydat);
        this.alo[i].ngaydat = (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + "-" + (d.getMonth() > 8 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + d.getFullYear();
      }
    });
  }
  thanhtoan(){
    if(this.alo!=''){
      this.api.post(`/api/Hoadon/create-payment?number=${(this.sum-(this.sum/10))}`,{}).subscribe(res => {
        localStorage.setItem("idhd",this.alo[0].id)
        location.href=res;
      });
    }
  }
}
