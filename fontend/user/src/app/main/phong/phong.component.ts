import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { window } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


declare var $: any;

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.css'],
  providers: [MessageService],
})
export class PhongComponent extends BaseComponent implements OnInit,AfterViewInit{
  // public items!: MenuItem[];
  public page = 1;
  // public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  // public namemodel: any;
  public alo2: any;
  // public frma: FormGroup;
  public error = '';
  public ngaybd="";
  public ngaykt="";
  public link="./assets/images";
  public kh:any;
  public gia=0;
  public phong:any=[];
  public loai1=0;
  public loai2=0;
  public loai3=0;
  public loai4=0;
  public loai5=0;
  public time:any;
  public datcoc=false;

mota: any;
  // public lp:any;
  constructor(inject:Injector,private dn:AuthenticationService,private router:Router,private mess: MessageService,private cookieService: CookieService){
    super(inject);
  }

  showError(message: any) {
    this.mess.add({ severity: 'error', summary: 'Cảnh báo', detail: message });
  }
  showSuccess(message: any) {
    this.mess.add({ severity: 'success', summary: 'Thành công', detail: message });
  }
  ngOnInit(): void {
    setTimeout(()=>this.value(),1000)
    var url=location.search
    if(url!=""){
      if(url.includes("vnp_ResponseCode=00")){
        let chitiet=JSON.parse(localStorage.getItem("datphong")||"{}")
        this.aloaddd(chitiet["sophong"],chitiet["id"],chitiet["ngaybd"],chitiet["ngaykt"],chitiet["email"],chitiet["gia"],chitiet["ten"])
        localStorage.removeItem("datphong")
        localStorage.setItem("kq","tc")
      }
      if(url.includes("vnp_ResponseCode=24")){
        localStorage.setItem("kq","tb")
        location.href="https://thanglonghotel.netlify.app/p"
      }
    }
    else{
      if(localStorage.getItem("kq")=="tc"){
        setTimeout(()=>this.showSuccess("Đặt phòng thành công"),500)
      }
      if(localStorage.getItem("kq")=="tb"){
        setTimeout(()=>this.showError("Đặt phòng thất bại"),500)
        setTimeout(()=>this.showError("chọn lại phòng"),500)
      }
      localStorage.removeItem("kq")
    }
  }
  value(){
    let a=$("#tg").val();
    if(a==''){
      this.showError("Chọn ngày nhận phòng - trả phòng")
      // this.search("");
    }
    else{
      this.ngaybd=a.slice(0,10);
      this.ngaykt=a.slice(-10);
      this.time=this.timerange(this.ngaybd,this.ngaykt)
      this.search();
    }
  }
  timerange(a:any,b:any){
    var date = a.split('/');
    var date2 = b.split('/');
    var time1 = new Date(date[1] + '/' + date[0] + '/' + date[2]);
    var time2 = new Date(date2[1] + '/' + date2[0] + '/' + date2[2]);
    let ms1 = time1.getTime();
    let ms2 = time2.getTime();
    return Math.ceil((ms2 - ms1) / (24*60*60*1000));
  }
  add(idp:any,idh:any){
    // this.value();
    if(this.cookieService.get('id')==''){
      this.showError("Cần đăng nhập !");
      setTimeout(()=>this.dn.logout(),3000);
    }else{
      for(let i=0;i<this.alo2.length;i++){
        if(this.alo2[i].t.id==idp){
          if(this.alo2[i].num>0){
            this.alo2[i].num--;
            switch (i){
              case 0:{
                this.loai1+=1
                break
              }
              case 1:{
                this.loai2+=1
                break
              }
              case 2:{
                this.loai3+=1
                break
              }
              case 3:{
                this.loai4+=1
                break
              }
              case 4:{
                this.loai5+=1
                break
              }
            }
            this.gia+=idh*this.time
            this.phong.push(idp)
            this.showSuccess("Chọn phòng thành công!");
          }
          else{
            this.showError("Đã hết phòng !");
          }
        }
      }
      // this.search(idp);
    }
  }
  cocphong(){
    if(this.gia==0 && this.phong==""){
      this.showError("Hãy chọn phòng")
    }
    else{
      this.datcoc=true
    }
  }
  datphong(){
    this.kh=this.dn.userValue;
    this.api.post(`/api/Thuephong/create-payment?number=${this.gia/10}`,{}).subscribe(res => {
      localStorage.setItem("datphong",JSON.stringify({"id":this.cookieService.get('id'),"ngaybd":this.ngaybd,"ngaykt":this.ngaykt,"sophong":this.phong,"gia":this.gia,"email":this.kh.email,"ten":this.kh.hoTen}))
      location.href=res;
    });
  }
  search() {
    // alert(this.ngaybd)
    this.api.post('/api/Thuephong/search', {ngaybd:this.ngaybd,ngaykt:this.ngaykt}).subscribe(res => {
      this.alo2 = res.alo;
    });
  }
  aloaddd(sophong: any,idkh: any,ngaybd: any,ngaykt:any, email:any,gia:any,ten:any) {
    this.api.post('/api/Thuephong/add', { idp:sophong,idkh: idkh,ngaybd: ngaybd,ngaykt:ngaykt,email: email,gia:gia,ten: ten }).subscribe(res => {
      console.log(res);
      location.href="https://thanglonghotel.netlify.app/p"

    });
    this.api.post('/api/Hoadon/add', {idkh: idkh,coc:gia/10,gia:gia}).subscribe(res => {
      console.log(res)
    });
  };
  ngAfterViewInit(): void {
    this.loadScripts('assets/js/jquery.mCustomScrollbar.concat.min.js', 'assets/js/custom.js','assets/js/owl.carousel.js','https:cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js');
    this.loadScripts('./assets/js/main.js');
  }
}