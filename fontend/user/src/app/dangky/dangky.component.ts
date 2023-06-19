import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css'],
  providers: [MessageService],
})
export class DangkyComponent extends BaseComponent implements OnInit {
  public frmLogin: FormGroup;
  public submitted = false;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public tt:any;
  public otp:any;
  constructor(inject:Injector,private router:Router,private mess: MessageService){
    super(inject);
  }
  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      'txt_hoten': new FormControl('', [Validators.required]),
      'txt_quequan': new FormControl('', [Validators.required]),
      'txt_sdt': new FormControl(''),
      'txt_socccd': new FormControl('', [Validators.required]),
      'txt_email': new FormControl('', [Validators.required]),
      'txt_taikhoan': new FormControl('', [Validators.required]),
      'txt_matkhau': new FormControl('', [Validators.required]),
      'txt_matkhau2': new FormControl('', [Validators.required]),
    });
  }

  showError(message: any) {
    this.mess.add({ severity: 'error', summary: 'Cảnh báo', detail: message });
  }
  showSuccess(message: any) {
    this.mess.add({ severity: 'success', summary: 'Thành công', detail: message });
  }

  dangky(a:any){
    this.tt=a;
    if(a.txt_matkhau==a.txt_matkhau2){
      this.api.post('/api/Khachhangs/check', {email:a.txt_email}).subscribe(res => {
        $('#otpf').css("display","flex")
      });
    }
   else{
    this.showError("Mật khẩu không trùng khớp")
   }
    }
  get(){
    this.api.post('/api/Khachhangs/checks', {num:$('#otp').val()}).subscribe(res => {
      if(res==true){
        this.showSuccess("Đăng ký thành công")
        this.api.post('/api/Khachhangs/dangky', {hoten:this.tt.txt_hoten,quequan:this.tt.txt_quequan,scccd:this.tt.txt_socccd,sdt:this.tt.txt_sdt,email:this.tt.txt_email,taikhoan:this.tt.txt_taikhoan,matkhau:this.tt.txt_matkhau}).subscribe(res => {
          $('#otpf').css("display","flex")
        });
        setTimeout(()=>this.router.navigate(["/login"]),3000)
      }
      else{
        this.showError("Nhập sai mã otp ")
      }
    });
  }
  get hoten() {
    return this.frmLogin.get('txt_hoten')!;
  }
  get quequan() {
    return this.frmLogin.get('txt_quequan')!;
  }
  get email() {
    return this.frmLogin.get('txt_email')!;
  }
  get cancuoc() {
    return this.frmLogin.get('txt_socccd')!;
  }
  get taikhoan() {
    return this.frmLogin.get('txt_taikhoan')!;
  }
  get matkhau() {
    return this.frmLogin.get('txt_matkhau')!;
  }
  get matkhau2() {
    return this.frmLogin.get('txt_matkhau2')!;
  }
}
