import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit,AfterViewInit{
  constructor(inject:Injector,private dn:AuthenticationService,private router:Router){
    super(inject);
  }
  public alo2:any;

  ngOnInit(): void {
    this.search();
  }
  dangnhap(){
    if(localStorage.getItem('id')==''){
      alert("Cần đăng nhập !");
      this.dn.logout();
    }
    else{
      alert(localStorage.getItem('id'));
      this.router.navigate(['/p']);
    }
  }
  search() {
    // alert(this.ngaybd)
    this.api.get('/api/Danhgia/getall').subscribe(res => {
      this.alo2 = res;
    });
  }
  ngAfterViewInit(): void {
    this.loadScripts('./assets/js/main.js');
  }
}
